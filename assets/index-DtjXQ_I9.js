var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function formatProdErrorMessage$1(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;
function isPlainObject$1(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore$1(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(formatProdErrorMessage$1(2));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage$1(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage$1(1));
    }
    return enhancer(createStore$1)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(3));
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(formatProdErrorMessage$1(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(5));
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage$1(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject$1(action)) {
      throw new Error(formatProdErrorMessage$1(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage$1(8));
    }
    if (typeof action.type !== "string") {
      throw new Error(formatProdErrorMessage$1(17));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage$1(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage$1(11));
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error(formatProdErrorMessage$1(12));
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage$1(13));
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage$1(14));
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(formatProdErrorMessage$1(15));
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}
function isAction(action) {
  return isPlainObject$1(action) && "type" in action && typeof action.type === "string";
}
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  var _a;
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_a = value.constructor) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    Object.entries(obj).forEach(([key, value]) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && Object.prototype.propertyIsEnumerable.call(targetObject, prop))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc == null ? void 0 : desc.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  var _a;
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (_a = desc.get) == null ? void 0 : _a.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof (config == null ? void 0 : config.autoFreeze) === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof (config == null ? void 0 : config.useStrictShallowCopy) === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
var immer = new Immer2();
var produce = immer.produce;
immer.produceWithPatches.bind(
  immer
);
immer.setAutoFreeze.bind(immer);
immer.setUseStrictShallowCopy.bind(immer);
immer.applyPatches.bind(immer);
immer.createDraft.bind(immer);
immer.finishDraft.bind(immer);
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return compose;
  return compose.apply(null, arguments);
};
var hasMatchFunction = (v) => {
  return v && typeof v.match === "function";
};
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error(formatProdErrorMessage(0));
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && {
          meta: prepared.meta
        },
        ..."error" in prepared && {
          error: prepared.error
        }
      };
    }
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => isAction(action) && action.type === type;
  return actionCreator;
}
var Tuple = class _Tuple extends Array {
  constructor(...items) {
    super(...items);
    Object.setPrototypeOf(this, _Tuple.prototype);
  }
  static get [Symbol.species]() {
    return _Tuple;
  }
  concat(...arr) {
    return super.concat.apply(this, arr);
  }
  prepend(...arr) {
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new _Tuple(...arr[0].concat(this));
    }
    return new _Tuple(...arr.concat(this));
  }
};
function freezeDraftable(val) {
  return isDraftable(val) ? produce(val, () => {
  }) : val;
}
function getOrInsertComputed(map, key, compute) {
  if (map.has(key)) return map.get(key);
  return map.set(key, compute(key)).get(key);
}
function isBoolean(x) {
  return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
  const {
    thunk: thunk$1 = true,
    immutableCheck = true,
    serializableCheck = true,
    actionCreatorCheck = true
  } = options ?? {};
  let middlewareArray = new Tuple();
  if (thunk$1) {
    if (isBoolean(thunk$1)) {
      middlewareArray.push(thunk);
    } else {
      middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
    }
  }
  return middlewareArray;
};
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var createQueueWithTimer = (timeout) => {
  return (notify) => {
    setTimeout(notify, timeout);
  };
};
var autoBatchEnhancer = (options = {
  type: "raf"
}) => (next) => (...args) => {
  const store = next(...args);
  let notifying = true;
  let shouldNotifyAtEndOfTick = false;
  let notificationQueued = false;
  const listeners = /* @__PURE__ */ new Set();
  const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10)
  ) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
  const notifyListeners = () => {
    notificationQueued = false;
    if (shouldNotifyAtEndOfTick) {
      shouldNotifyAtEndOfTick = false;
      listeners.forEach((l) => l());
    }
  };
  return Object.assign({}, store, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(listener2) {
      const wrappedListener = () => notifying && listener2();
      const unsubscribe = store.subscribe(wrappedListener);
      listeners.add(listener2);
      return () => {
        unsubscribe();
        listeners.delete(listener2);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(action) {
      var _a;
      try {
        notifying = !((_a = action == null ? void 0 : action.meta) == null ? void 0 : _a[SHOULD_AUTOBATCH]);
        shouldNotifyAtEndOfTick = !notifying;
        if (shouldNotifyAtEndOfTick) {
          if (!notificationQueued) {
            notificationQueued = true;
            queueCallback(notifyListeners);
          }
        }
        return store.dispatch(action);
      } finally {
        notifying = true;
      }
    }
  });
};
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
  const {
    autoBatch = true
  } = options ?? {};
  let enhancerArray = new Tuple(middlewareEnhancer);
  if (autoBatch) {
    enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
  }
  return enhancerArray;
};
function configureStore(options) {
  const getDefaultMiddleware = buildGetDefaultMiddleware();
  const {
    reducer = void 0,
    middleware,
    devTools = true,
    preloadedState = void 0,
    enhancers = void 0
  } = options;
  let rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (isPlainObject$1(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error(formatProdErrorMessage(1));
  }
  let finalMiddleware;
  if (typeof middleware === "function") {
    finalMiddleware = middleware(getDefaultMiddleware);
  } else {
    finalMiddleware = getDefaultMiddleware();
  }
  let finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: false,
      ...typeof devTools === "object" && devTools
    });
  }
  const middlewareEnhancer = applyMiddleware(...finalMiddleware);
  const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
  let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
  const composedEnhancer = finalCompose(...storeEnhancers);
  return createStore$1(rootReducer, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) {
        throw new Error(formatProdErrorMessage(28));
      }
      if (type in actionsMap) {
        throw new Error(formatProdErrorMessage(29));
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addMatcher(matcher, reducer) {
      actionMatchers.push({
        matcher,
        reducer
      });
      return builder;
    },
    addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x) {
  return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = () => freezeDraftable(initialState());
  } else {
    const frozenInitialState = freezeDraftable(initialState);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
      matcher
    }) => matcher(action)).map(({
      reducer: reducer2
    }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return produce(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
var matches = (matcher, action) => {
  if (hasMatchFunction(matcher)) {
    return matcher.match(action);
  } else {
    return matcher(action);
  }
};
function isAnyOf(...matchers) {
  return (action) => {
    return matchers.some((matcher) => matches(matcher, action));
  };
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var commonProperties = ["name", "message", "stack", "code"];
var RejectWithValue = class {
  constructor(payload, meta) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    __publicField(this, "_type");
    this.payload = payload;
    this.meta = meta;
  }
};
var FulfillWithMeta = class {
  constructor(payload, meta) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    __publicField(this, "_type");
    this.payload = payload;
    this.meta = meta;
  }
};
var miniSerializeError = (value) => {
  if (typeof value === "object" && value !== null) {
    const simpleError = {};
    for (const property of commonProperties) {
      if (typeof value[property] === "string") {
        simpleError[property] = value[property];
      }
    }
    return simpleError;
  }
  return {
    message: String(value)
  };
};
var createAsyncThunk = /* @__PURE__ */ (() => {
  function createAsyncThunk2(typePrefix, payloadCreator, options) {
    const fulfilled = createAction(typePrefix + "/fulfilled", (payload, requestId, arg, meta) => ({
      payload,
      meta: {
        ...meta || {},
        arg,
        requestId,
        requestStatus: "fulfilled"
      }
    }));
    const pending = createAction(typePrefix + "/pending", (requestId, arg, meta) => ({
      payload: void 0,
      meta: {
        ...meta || {},
        arg,
        requestId,
        requestStatus: "pending"
      }
    }));
    const rejected = createAction(typePrefix + "/rejected", (error, requestId, arg, payload, meta) => ({
      payload,
      error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
      meta: {
        ...meta || {},
        arg,
        requestId,
        rejectedWithValue: !!payload,
        requestStatus: "rejected",
        aborted: (error == null ? void 0 : error.name) === "AbortError",
        condition: (error == null ? void 0 : error.name) === "ConditionError"
      }
    }));
    function actionCreator(arg) {
      return (dispatch, getState, extra) => {
        const requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        const abortController = new AbortController();
        let abortHandler;
        let abortReason;
        function abort(reason) {
          abortReason = reason;
          abortController.abort();
        }
        const promise = async function() {
          var _a, _b;
          let finalAction;
          try {
            let conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, {
              getState,
              extra
            });
            if (isThenable(conditionResult)) {
              conditionResult = await conditionResult;
            }
            if (conditionResult === false || abortController.signal.aborted) {
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            }
            const abortedPromise = new Promise((_, reject) => {
              abortHandler = () => {
                reject({
                  name: "AbortError",
                  message: abortReason || "Aborted"
                });
              };
              abortController.signal.addEventListener("abort", abortHandler);
            });
            dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, {
              requestId,
              arg
            }, {
              getState,
              extra
            })));
            finalAction = await Promise.race([abortedPromise, Promise.resolve(payloadCreator(arg, {
              dispatch,
              getState,
              extra,
              requestId,
              signal: abortController.signal,
              abort,
              rejectWithValue: (value, meta) => {
                return new RejectWithValue(value, meta);
              },
              fulfillWithValue: (value, meta) => {
                return new FulfillWithMeta(value, meta);
              }
            })).then((result) => {
              if (result instanceof RejectWithValue) {
                throw result;
              }
              if (result instanceof FulfillWithMeta) {
                return fulfilled(result.payload, requestId, arg, result.meta);
              }
              return fulfilled(result, requestId, arg);
            })]);
          } catch (err) {
            finalAction = err instanceof RejectWithValue ? rejected(null, requestId, arg, err.payload, err.meta) : rejected(err, requestId, arg);
          } finally {
            if (abortHandler) {
              abortController.signal.removeEventListener("abort", abortHandler);
            }
          }
          const skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
          if (!skipDispatch) {
            dispatch(finalAction);
          }
          return finalAction;
        }();
        return Object.assign(promise, {
          abort,
          requestId,
          arg,
          unwrap() {
            return promise.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      settled: isAnyOf(rejected, fulfilled),
      typePrefix
    });
  }
  createAsyncThunk2.withTypes = () => createAsyncThunk2;
  return createAsyncThunk2;
})();
function unwrapResult(action) {
  if (action.meta && action.meta.rejectedWithValue) {
    throw action.payload;
  }
  if (action.error) {
    throw action.error;
  }
  return action.payload;
}
function isThenable(value) {
  return value !== null && typeof value === "object" && typeof value.then === "function";
}
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
function buildCreateSlice({
  creators
} = {}) {
  var _a;
  const cAT = (_a = creators == null ? void 0 : creators.asyncThunk) == null ? void 0 : _a[asyncThunkSymbol];
  return function createSlice2(options) {
    const {
      name,
      reducerPath = name
    } = options;
    if (!name) {
      throw new Error(formatProdErrorMessage(11));
    }
    const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
    const reducerNames = Object.keys(reducers);
    const context = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    };
    const contextMethods = {
      addCase(typeOrActionCreator, reducer2) {
        const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (!type) {
          throw new Error(formatProdErrorMessage(12));
        }
        if (type in context.sliceCaseReducersByType) {
          throw new Error(formatProdErrorMessage(13));
        }
        context.sliceCaseReducersByType[type] = reducer2;
        return contextMethods;
      },
      addMatcher(matcher, reducer2) {
        context.sliceMatchers.push({
          matcher,
          reducer: reducer2
        });
        return contextMethods;
      },
      exposeAction(name2, actionCreator) {
        context.actionCreators[name2] = actionCreator;
        return contextMethods;
      },
      exposeCaseReducer(name2, reducer2) {
        context.sliceCaseReducersByName[name2] = reducer2;
        return contextMethods;
      }
    };
    reducerNames.forEach((reducerName) => {
      const reducerDefinition = reducers[reducerName];
      const reducerDetails = {
        reducerName,
        type: getType(name, reducerName),
        createNotation: typeof options.reducers === "function"
      };
      if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
        handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
      } else {
        handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
      }
    });
    function buildReducer() {
      const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
      const finalCaseReducers = {
        ...extraReducers,
        ...context.sliceCaseReducersByType
      };
      return createReducer(options.initialState, (builder) => {
        for (let key in finalCaseReducers) {
          builder.addCase(key, finalCaseReducers[key]);
        }
        for (let sM of context.sliceMatchers) {
          builder.addMatcher(sM.matcher, sM.reducer);
        }
        for (let m of actionMatchers) {
          builder.addMatcher(m.matcher, m.reducer);
        }
        if (defaultCaseReducer) {
          builder.addDefaultCase(defaultCaseReducer);
        }
      });
    }
    const selectSelf = (state) => state;
    const injectedSelectorCache = /* @__PURE__ */ new Map();
    let _reducer;
    function reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    }
    function getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    }
    function makeSelectorProps(reducerPath2, injected = false) {
      function selectSlice(state) {
        let sliceState = state[reducerPath2];
        if (typeof sliceState === "undefined") {
          if (injected) {
            sliceState = getInitialState();
          }
        }
        return sliceState;
      }
      function getSelectors(selectState = selectSelf) {
        const selectorCache = getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap());
        return getOrInsertComputed(selectorCache, selectState, () => {
          const map = {};
          for (const [name2, selector] of Object.entries(options.selectors ?? {})) {
            map[name2] = wrapSelector(selector, selectState, getInitialState, injected);
          }
          return map;
        });
      }
      return {
        reducerPath: reducerPath2,
        getSelectors,
        get selectors() {
          return getSelectors(selectSlice);
        },
        selectSlice
      };
    }
    const slice = {
      name,
      reducer,
      actions: context.actionCreators,
      caseReducers: context.sliceCaseReducersByName,
      getInitialState,
      ...makeSelectorProps(reducerPath),
      injectInto(injectable, {
        reducerPath: pathOpt,
        ...config
      } = {}) {
        const newReducerPath = pathOpt ?? reducerPath;
        injectable.inject({
          reducerPath: newReducerPath,
          reducer
        }, config);
        return {
          ...slice,
          ...makeSelectorProps(newReducerPath, true)
        };
      }
    };
    return slice;
  };
}
function wrapSelector(selector, selectState, getInitialState, injected) {
  function wrapper(rootState, ...args) {
    let sliceState = selectState(rootState);
    if (typeof sliceState === "undefined") {
      if (injected) {
        sliceState = getInitialState();
      }
    }
    return selector(sliceState, ...args);
  }
  wrapper.unwrapped = selector;
  return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
  function asyncThunk(payloadCreator, config) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator,
      ...config
    };
  }
  asyncThunk.withTypes = () => asyncThunk;
  return {
    reducer(caseReducer) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [caseReducer.name](...args) {
          return caseReducer(...args);
        }
      }[caseReducer.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(prepare, reducer) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare,
        reducer
      };
    },
    asyncThunk
  };
}
function handleNormalReducerDefinition({
  type,
  reducerName,
  createNotation
}, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
      throw new Error(formatProdErrorMessage(17));
    }
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else {
    caseReducer = maybeReducerWithPrepare;
  }
  context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({
  type,
  reducerName
}, reducerDefinition, context, cAT) {
  if (!cAT) {
    throw new Error(formatProdErrorMessage(18));
  }
  const {
    payloadCreator,
    fulfilled,
    pending,
    rejected,
    settled,
    options
  } = reducerDefinition;
  const thunk2 = cAT(type, payloadCreator, options);
  context.exposeAction(reducerName, thunk2);
  if (fulfilled) {
    context.addCase(thunk2.fulfilled, fulfilled);
  }
  if (pending) {
    context.addCase(thunk2.pending, pending);
  }
  if (rejected) {
    context.addCase(thunk2.rejected, rejected);
  }
  if (settled) {
    context.addMatcher(thunk2.settled, settled);
  }
  context.exposeCaseReducer(reducerName, {
    fulfilled: fulfilled || noop,
    pending: pending || noop,
    rejected: rejected || noop,
    settled: settled || noop
  });
}
function noop() {
}
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
const blockDelimiter = "---------------------------------------------------------";
const linkDelimiter = "\n\n";
const linkItemDelimiter = "\n";
function parseText(text) {
  return {
    data: text.split(blockDelimiter).filter(isntEmpty).map(trimEmptyEdges).map(parseBlock),
    getCategories() {
      return this.data.map((d) => d.title);
    },
    getCategoryLinkTypes(category) {
      const types = this.data.find((d) => d.title === category).links.map((link) => link.type);
      return Array.from(new Set(types));
    },
    getCategoryLinks(category) {
      return this.data.find((d) => d.title === category).links;
    },
    getLinkTypes() {
      const types = this.data.map((d) => d.links).reduce((acc, links) => [...acc, ...links], []).map((link) => link.type);
      return Array.from(new Set(types));
    },
    countLinkItems(category) {
      return this.data.find((d) => d.title === category).links.length;
    },
    getLinks() {
      return this.data.reduce((acc, item) => [...acc, ...item.links], []);
    }
  };
}
function isntEmpty(str) {
  return !!str;
}
function trimEmptyEdges(str) {
  return str.trim();
}
function parseLink(str, title) {
  const linkData = str.split(linkItemDelimiter);
  return {
    description: linkData[0],
    src: linkData[1],
    type: linkData[2] ? linkData[2].slice(3) : "",
    category: title
  };
}
function parseBlock(str) {
  const blockData = str.split(linkDelimiter);
  const title = blockData[0].slice(2);
  return {
    title,
    links: blockData.slice(1).map((str2) => {
      return parseLink(str2, title);
    })
  };
}
const db = {
  links: null,
  createKey() {
    return `links-${Math.random().toFixed(10).slice(2)}`;
  },
  loadLinks() {
    return Object.keys(localStorage).filter((key) => key.startsWith("links")).map((key) => JSON.parse(localStorage.getItem(key)));
  },
  setLink(linkData) {
    const key = this.createKey();
    const data = { ...linkData, _id: key };
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  },
  updateLink(id, linkData) {
    const data = { ...linkData, _id: id };
    localStorage.setItem(id, JSON.stringify(data));
    return data;
  },
  removeLink(id) {
    localStorage.removeItem(id);
    return id;
  },
  getLinks() {
    return this.links;
  },
  init() {
    this.links = this.loadLinks();
  }
};
async function initiateDB() {
  const text = await readText("initialList.txt");
  const links = parseText(text).getLinks();
  if (!localStorage.length) {
    links.forEach((link) => db.setLink(link));
  }
  db.init();
}
async function readText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}
const api = {
  loadLinks: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db.getLinks());
    }, 1e3);
  }),
  createLink: (linkData) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db.setLink(linkData));
    }, 1e3);
  }),
  updateLink: (id, updatedData) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db.updateLink(id, updatedData));
    }, 1e3);
  }),
  deleteLink: (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db.removeLink(id));
    }, 1e3);
  })
};
const linksSlice = createSlice({
  name: "links",
  initialState: {
    data: [
      {
        category: "HTML & CSS",
        src: "https://www.joshwcomeau.com/css/transforms/",
        description: "The World of CSS Transforms",
        type: "guide"
      }
    ]
  },
  reducers: {
    editedLinkIdSelected: (state, action) => {
      state.editedId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(linkRemoved.pending, (state, action) => {
      state.status = "loading";
    }).addCase(linkRemoved.fulfilled, (state, action) => {
      const id = action.payload;
      const ind = state.data.findIndex((d) => d._id == id);
      state.removedLinkCategory = state.data[ind].category;
      state.data.splice(ind, 1);
      state.removedId = id;
      state.status = "idle";
    }).addCase(linkCreated.pending, (state, action) => {
      state.status = "loading";
    }).addCase(linkCreated.fulfilled, (state, action) => {
      state.data.push({ ...action.payload });
      state.createdId = action.payload._id;
      state.status = "idle";
    }).addCase(linkEdited.pending, (state, action) => {
      state.status = "loading";
    }).addCase(linkEdited.fulfilled, (state, action) => {
      const { _id, src, type, description, category } = action.payload;
      const item = state.data.find((d) => d._id == _id);
      item.src = src;
      item.type = type;
      item.description = description;
      item.category = category;
      state.editedLink = { ...action.payload };
      state.status = "idle";
    });
  }
});
const linksReducer = linksSlice.reducer;
const linkRemoved = createAsyncThunk("links/linkRemoved", async (id) => {
  const response = await api.deleteLink(id);
  return response;
});
const linkCreated = createAsyncThunk("links/linkCreated", async (linkData) => {
  const response = await api.createLink(linkData);
  return response;
});
const linkEdited = createAsyncThunk("links/linkEdited", async (linkData) => {
  const response = await api.updateLink(linkData._id, linkData);
  return response;
});
const { editedLinkIdSelected } = linksSlice.actions;
const selectCreatedLink = (state) => {
  return state.links.data.find((d) => d._id == state.links.createdId);
};
const selectLinkForEdit = (state) => {
  return state.links.data.find((d) => d._id == state.links.editedId);
};
const selectEditedLink = (state) => state.links.editedLink;
const selectCountLinksByCategory = (state) => {
  const data = {};
  state.links.data.forEach(({ category }) => {
    if (!(category in data)) {
      data[category] = 1;
    } else {
      data[category] += 1;
    }
  });
  return data;
};
const selectLinkCategories = (state) => Array.from(
  new Set(
    state.links.data.map((d) => d.category)
  )
);
const selectLinksByCategory = (state, category) => state.links.data.filter((link) => link.category === category);
const selectLinkTypes = (state) => Array.from(
  new Set(
    state.links.data.map((d) => d.type)
  )
);
const selectLinkTypesByCategory = (state, category) => {
  const links = selectLinksByCategory(state, category);
  return Array.from(
    new Set(
      links.map((link) => link.type)
    )
  );
};
const selectRemovedLinkId = (state) => state.links.removedId;
const selectRemovedLinkCategory = (state) => state.links.removedLinkCategory;
const selectLoadingStatus = (state) => state.links.status;
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    menuCategory: "",
    // selected menu category
    isMenuOpened: false,
    // on small screen assigns whether category menu is opened or isn't
    isSmallScreen: false,
    isSettingsWindowOpened: false,
    linkFormMode: ""
    // whether link form is for creation or editing
  },
  reducers: {
    menuCategorySelected: (state, action) => {
      state.menuCategory = action.payload;
    },
    categoryMenuToggled: (state) => {
      state.isMenuOpened = !state.isMenuOpened;
    },
    screenSizeChanged: (state, action) => {
      state.isSmallScreen = action.payload;
    },
    settingsWindowToggled: (state) => {
      state.isSettingsWindowOpened = !state.isSettingsWindowOpened;
    },
    linkFormModeChanged: (state, action) => {
      state.linkFormMode = action.payload;
    }
  }
});
const uiReducer = uiSlice.reducer;
const {
  menuCategorySelected,
  categoryMenuToggled,
  screenSizeChanged,
  settingsWindowToggled,
  linkFormModeChanged
} = uiSlice.actions;
const selectMenuCategory = (state) => state.ui.menuCategory;
const selectMenuVisibility = (state) => state.ui.isMenuOpened;
const selectIsSmallScreen = (state) => state.ui.isSmallScreen;
const selectLinkFormMode = (state) => state.ui.linkFormMode;
const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    linkType: {
      category: "",
      type: ""
    }
  },
  reducers: {
    linkTypeSelected: (state, action) => {
      state.linkType = { ...action.payload };
    }
  }
});
const filtersSlice$1 = filtersSlice.reducer;
const { linkTypeSelected } = filtersSlice.actions;
const selectLinkType = (state, category) => state.filters.linkType;
const actionSlice = createSlice({
  name: "action",
  initialState: {
    action: ""
  },
  reducers: {
    actionHappened: (state, action) => {
      state.action = action.payload;
    }
  }
});
const actionSlice$1 = actionSlice.reducer;
const { actionHappened } = actionSlice.actions;
const selectAction = (state) => state.action.action;
function initStore(data) {
  return configureStore({
    reducer: {
      links: linksReducer,
      ui: uiReducer,
      filters: filtersSlice$1,
      action: actionSlice$1
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logActionType),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(actionEnhancer),
    preloadedState: data
  });
}
const actionEnhancer = (createStore2) => {
  return (reducer, state, enhancer) => {
    const store = createStore2(reducer, state, enhancer);
    const newDispatch = (action) => {
      const result = store.dispatch(action);
      store.dispatch(actionHappened(action.type));
      store.dispatch(actionHappened(""));
      return result;
    };
    return { ...store, dispatch: newDispatch };
  };
};
function logActionType(store) {
  return (next) => (action) => {
    console.log(action.type);
    return next(action);
  };
}
function createStore(data) {
  const store = initStore(data);
  return {
    store,
    useSelector(fn) {
      return (...args) => {
        return fn(store.getState(), ...args);
      };
    },
    useDispatch() {
      return store.dispatch;
    }
  };
}
function useSelector(owner, store, selectors) {
  selectors.forEach((selector) => owner[selector.name] = store.useSelector(selector));
}
function useDispatch(owner, store, actions) {
  actions.forEach((action) => owner[action.name] = action(store.useDispatch()));
}
const OPEN_CATEGORY_MENU_BUTTON = "menu-panel__menu-opener";
const CATEGORY_MENU = "category-menu";
const CATEGORY_MENU_SHOW = "page__category-menu_visible";
const CATEGORY_MENU_ITEM = "category-menu__item";
const CATEGORY_MENU_HEADER = "category-menu__header";
const CATEGORY_MENU_LINK = "category-menu__link";
const CATEGORY_MENU_LINK_TOTAL = "category-menu__link-total";
const CATEGORY_MENU_OPENER_HIDE = "page__menu-opener_hidden";
const CONTENT = "content";
const CONTENT_HIDE = "page__content_hidden";
const LINK_CATEGORY = "category";
const LINK_CATEGORY_HEADER = "category__header";
const LINK_CATEGORY_HEADER_HIDE = "category__header_hidden";
const LINK_CATEGORY_HEADER_SORTNAME = "category__header-sortname";
const LINK_CATEGORY_HEADER_SELECT = "category__header-select";
const LINK_LIST = "link-list";
const LINK_LIST_ITEM = "link-list__item";
const LINK_LIST_ITEM_CONTENT = "link-list__item-content";
const LINK_TYPE = "link-list__item-type";
const LINK_TOPIC = "link-list__item-description";
const LINK_CONTROLS = "link-list__item-controls";
const LINK_CONTROLS_HIDE = "link-list__item-controls_hidden";
const LINK_CONTROLS_SM_SC = "page__link-list-controls_adaptive";
const LINK_BUTTON = "link-list__item-button";
const EDIT_BUTTON = "link-list__item-button_edit";
const REMOVE_BUTTON = "link-list__item-button_close";
const SETTINGS_MENU = "settings-menu";
const OPEN_SETTINGS_BUTTON = "settings-menu__link-form-opener";
const SETTINGS_WINDOW = "settings-window";
const SETTINGS_WINDOW_HIDE = "page__settings-window_hidden";
const CLOSE_BUTTON = "link-window__close-btn";
const LINK_FORM = "link-window__form";
const LINK_FORM_BUTTON_HIDE = "link-window__btn_hide";
const LINK_WINDOW_INPUT = "link-window__form-input";
const THEME_BUTTON = "theme__button_initial";
const THEME_LINK = "theme__link_initial";
const THEME_LINK_SELECTED = "theme__link_initial-selected";
const THEME_LINK_HIGHLIGHT = "theme__link_initial-highlighted";
const THEME_COLOR_MUTE = "theme__color-initial_mute";
const THEME_CATEGORY_MENU_ITEM = "theme__category-menu-item_initial";
const THEME_CATEGORY_MENU_ITEM_SELECTED = "theme__category-menu-item_initial-selected";
const THEME_CATEGORY_MENU_ITEM_ADAPTIVE = "theme__category-menu-item_initial-adaptive";
function createItemTemplate(category, itemId, total) {
  let html = "";
  html += `<li class="${CATEGORY_MENU_ITEM} ${THEME_CATEGORY_MENU_ITEM} ${THEME_CATEGORY_MENU_ITEM_ADAPTIVE}" data-category="${category}">`;
  html += `<h2 class="${CATEGORY_MENU_HEADER}">`;
  html += `<a class="${CATEGORY_MENU_LINK}" href=#${itemId}>`;
  html += `${category} `;
  html += `<span class="${CATEGORY_MENU_LINK_TOTAL} ${THEME_COLOR_MUTE}">${total}</span>`;
  html += "</a>";
  html += "</h2>";
  html += "</li>";
  return html;
}
const dom = {
  getContent: () => document.querySelector(`.${CONTENT}`),
  getCategory: (category) => document.querySelector(`.${LINK_CATEGORY}[data-category="${category}"]`),
  getCategoryByElem: (target) => target.closest(`.${LINK_CATEGORY}`),
  getLinkList: (category) => document.querySelector(`.${LINK_LIST}[data-category="${category}"]`),
  getSettingsWindow: () => document.querySelector(`.${SETTINGS_WINDOW}`),
  getCloseButton: (target) => target.closest(`.${CLOSE_BUTTON}`),
  linkForm: {
    get: () => document.querySelector(`.${LINK_FORM}`),
    getCategorySelect: (target) => target.querySelector(`select[name="category"]`),
    getTypesSelect: (target) => target.querySelector(`select[name="type"]`)
  },
  settingsMenu: {
    get: () => document.querySelector(`.${SETTINGS_MENU}`),
    getOpenButton: (target) => target.closest(`.${OPEN_SETTINGS_BUTTON}`)
  },
  link: {
    get: (target) => target.closest(`.${LINK_LIST_ITEM}`),
    getById: (target, id) => target.querySelector(`.${LINK_LIST_ITEM}[data-linkid="${id}"]`),
    getRemoveButton: (target) => target.closest(`.${REMOVE_BUTTON}`),
    getEditButton: (target) => target.closest(`.${EDIT_BUTTON}`),
    getLast: (target) => target.querySelector(`.${LINK_LIST_ITEM}:last-child`),
    getCurrentSelected: () => document.querySelector(`.${THEME_LINK_SELECTED}`),
    getControls: (target) => target.querySelector(`.${LINK_CONTROLS}`),
    getType: (target) => target.querySelector(`.${LINK_TYPE}`),
    getTopic: (target) => target.querySelector(`.${LINK_TOPIC}`)
  },
  categoryHeader: {
    get: (target) => target.querySelector(`.${LINK_CATEGORY_HEADER}`),
    getById: (id) => document.getElementById(id),
    getSelect: (target) => target.querySelector("select"),
    getOptionByType: (target, type) => target.querySelector(`option[data-type="${type}"]`)
  },
  categoryMenu: {
    getMenu: () => document.querySelector(`.${CATEGORY_MENU}`),
    getItem: (target) => target.closest(`.${CATEGORY_MENU_ITEM}`),
    getHighlightedItem: (target) => target.querySelector(`.${THEME_CATEGORY_MENU_ITEM_SELECTED}`),
    getItemByCategory: (target, category) => target.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"]`),
    getItemTotal: (target, category) => target.querySelector(`.${CATEGORY_MENU_ITEM}[data-category="${category}"] a > span`),
    getOpener: () => document.querySelector(`.${OPEN_CATEGORY_MENU_BUTTON}`),
    getLastItem: (target) => target.querySelector(`.${CATEGORY_MENU_ITEM}:last-child`)
  }
};
function createHoverEffect() {
  let currElm = null;
  return function create(container, fn) {
    container.addEventListener("mouseover", (e) => mouseover(e, container, fn));
    container.addEventListener("mouseout", (e) => mouseout(e, container, fn));
  };
  function mouseover(e, container, fn) {
    if (currElm) return;
    currElm = container;
    fn(currElm);
  }
  function mouseout(e, container, fn) {
    if (!currElm) return;
    let relatedTarget = event.relatedTarget;
    while (relatedTarget) {
      if (relatedTarget == currElm) return;
      relatedTarget = relatedTarget.parentNode;
    }
    fn(currElm);
    currElm = null;
  }
}
function isVisible(item) {
  const { top, height } = item.getBoundingClientRect();
  return top > 0 && top < window.innerHeight - height;
}
function replaceSpace(str) {
  return str.split(" ").join("-");
}
function replaceHyphen(str) {
  return str.split("-").join(" ");
}
function getCategoryFromHash() {
  const hash = window.location.hash;
  return hash ? replaceHyphen(hash.slice(1)) : "";
}
function getIsSmallScreen() {
  const SMALL_SCREEN_WIDTH = 650;
  return window.innerWidth <= SMALL_SCREEN_WIDTH;
}
function updateHash(id) {
  history.pushState(null, null, `#${id}`);
}
function scrollElementIntoView(element) {
  const coords = element.getBoundingClientRect();
  if (coords.top < 0) {
    element.scrollIntoView();
  } else if (coords.top > window.innerHeight - coords.height) {
    element.scrollIntoView(false);
  }
}
class Menu {
  constructor(categories, selectedCategory, storeAction) {
    this.node = dom.categoryMenu.getMenu();
    this.create(categories);
    this.highlightItem(selectedCategory);
    this.node.addEventListener("click", (e) => {
      const menuItem = dom.categoryMenu.getItem(e.target);
      if (menuItem) {
        storeAction(menuItem.dataset.category, e);
      }
    });
  }
  highlightItem(category) {
    if (!category) return;
    const highlightedItem = dom.categoryMenu.getHighlightedItem(this.node);
    if (highlightedItem) highlightedItem.classList.remove(`${THEME_CATEGORY_MENU_ITEM_SELECTED}`);
    const currentItem = dom.categoryMenu.getItemByCategory(this.node, category);
    if (currentItem) currentItem.classList.add(`${THEME_CATEGORY_MENU_ITEM_SELECTED}`);
  }
  changeLinkCount(categoryData) {
    const { category, total } = categoryData;
    dom.categoryMenu.getItemTotal(this.node, category).textContent = total;
    if (total === 0) {
      const menuItem = dom.categoryMenu.getItemByCategory(this.node, category);
      menuItem.remove();
    }
  }
  createItem(categoryData) {
    const { category, total } = categoryData;
    this.node.insertAdjacentHTML("beforeend", createItemTemplate(category, replaceSpace(category), total));
  }
  create(categories) {
    this.node.innerHTML = Object.entries(categories).reduce((html, [category, total]) => {
      return html + createItemTemplate(category, replaceSpace(category), total);
    }, "");
  }
  update(selectedCategory, categoryData, newCategoryData) {
    if (selectedCategory) this.highlightItem(selectedCategory);
    if (categoryData) this.changeLinkCount(categoryData);
    if (newCategoryData) this.createItem(newCategoryData);
  }
}
const pickMenuCategory = (dispatch) => (category) => dispatch(menuCategorySelected(category));
const toggleMenuOpener = (dispatch) => () => dispatch(categoryMenuToggled());
const changeScreenSize = (dispatch) => (isSmall) => dispatch(screenSizeChanged(isSmall));
const pickCategoryLinkType = (dispatch) => (payload) => dispatch(linkTypeSelected(payload));
const removeLink = (dispatch) => (id) => dispatch(linkRemoved(id));
const clickOnCategoryMenu = (dispatch) => (category, isSmallScreen, event2) => {
  dispatch(menuCategorySelected(category));
  if (isSmallScreen) {
    event2.preventDefault();
    dispatch(categoryMenuToggled());
  }
};
const openLinkFormForEditing = (dispatch) => (linkId) => {
  dispatch(settingsWindowToggled());
  dispatch(editedLinkIdSelected(linkId));
  dispatch(linkFormModeChanged("editing"));
};
const openLinkFormForCreation = (dispatch) => () => {
  dispatch(settingsWindowToggled());
  dispatch(linkFormModeChanged("creation"));
};
const closeSettingsWindow = (dispatch) => () => {
  dispatch(settingsWindowToggled());
  dispatch(linkFormModeChanged(""));
};
const createNewLink = (dispatch) => (linkData) => {
  dispatch(settingsWindowToggled());
  dispatch(linkFormModeChanged(""));
  dispatch(linkCreated(linkData));
};
const editPickedLink = (dispatch) => (linkData) => {
  dispatch(settingsWindowToggled());
  dispatch(linkFormModeChanged(""));
  dispatch(linkEdited(linkData));
};
let Wrapper$2 = class Wrapper {
  constructor(store) {
    this.component = null;
    this.categories = null;
    this.category = null;
    useSelector(this, store, [selectCountLinksByCategory, selectMenuCategory, selectIsSmallScreen, selectAction]);
    useDispatch(this, store, [clickOnCategoryMenu]);
    this.clickMenu = (category, event2) => {
      const isSmallScreen = this.selectIsSmallScreen();
      this.clickOnCategoryMenu(category, isSmallScreen, event2);
    };
    this.updateActions = {
      "ui/menuCategorySelected": true,
      "links/linkRemoved/fulfilled": true,
      "links/linkCreated/fulfilled": true,
      "links/linkEdited/fulfilled": true
    };
  }
  mount() {
    const categories = this.selectCountLinksByCategory();
    this.component = new Menu(sortCategories(categories), this.selectMenuCategory(), this.clickMenu);
    this.categories = categories;
  }
  update() {
    const action = this.selectAction();
    if (!(action in this.updateActions)) return;
    switch (action) {
      case "ui/menuCategorySelected": {
        this.component.update(this.selectMenuCategory());
        return;
      }
      case "links/linkRemoved/fulfilled":
      case "links/linkCreated/fulfilled":
      case "links/linkEdited/fulfilled": {
        const categories = this.selectCountLinksByCategory();
        for (let category in categories) {
          if (!(category in this.categories)) {
            this.component.update(null, null, { category, total: 1 });
            this.categories = categories;
            return;
          }
        }
        for (let category in this.categories) {
          const prev = this.categories[category];
          const curr = categories[category];
          if (prev !== curr) {
            this.component.update(null, { category, total: curr || 0 });
          }
        }
        this.categories = categories;
        return;
      }
    }
  }
};
function sortCategories(categories) {
  const arr = Object.entries(categories);
  arr.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    return -1;
  });
  return Object.fromEntries(arr);
}
class Opener {
  constructor(storeAction) {
    this.node = dom.categoryMenu.getOpener();
    this.content = dom.getContent();
    this.menu = dom.categoryMenu.getMenu();
    this.node.addEventListener("click", (e) => {
      storeAction();
    });
  }
  open() {
    this.content.classList.add(`${CONTENT_HIDE}`);
    this.menu.classList.add(`${CATEGORY_MENU_SHOW}`);
    this.node.classList.add(`${CATEGORY_MENU_OPENER_HIDE}`);
  }
  close() {
    this.content.classList.remove(`${CONTENT_HIDE}`);
    this.menu.classList.remove(`${CATEGORY_MENU_SHOW}`);
    this.node.classList.remove(`${CATEGORY_MENU_OPENER_HIDE}`);
  }
  update(isOpen) {
    isOpen ? this.open() : this.close();
  }
}
let Wrapper$1 = class Wrapper2 {
  constructor(store) {
    this.component = null;
    useSelector(this, store, [selectMenuVisibility, selectAction]);
    useDispatch(this, store, [toggleMenuOpener]);
    this.updateActions = {
      "ui/categoryMenuToggled": true
    };
  }
  mount() {
    this.component = new Opener(this.toggleMenuOpener);
  }
  update() {
    const action = this.selectAction();
    if (!(action in this.updateActions)) return;
    this.component.update(this.selectMenuVisibility());
  }
};
class Component {
  constructor(storeAction1, storeAction2) {
    this.content = dom.getContent();
    this.menu = dom.categoryMenu.getMenu();
    this.DY = 50;
    window.addEventListener("resize", () => {
      const isSmallScreen = getIsSmallScreen();
      storeAction1(isSmallScreen);
      if (!isSmallScreen) {
        const category2 = getCategoryFromHash();
        if (category2) {
          this.scrollToCategory(category2, isSmallScreen);
          scrollElementIntoView(this.getMenuItemByCategory(category2));
        }
      }
      if (!isSmallScreen) {
        this.content.classList.remove(`${CONTENT_HIDE}`);
        this.menu.classList.remove(`${CATEGORY_MENU_SHOW}`);
        dom.categoryMenu.getOpener().classList.remove(`${CATEGORY_MENU_OPENER_HIDE}`);
      }
    });
    this.content.addEventListener("scroll", () => {
      this.focusOnCategoryMenuItem(storeAction2, this.content);
    });
    const category = getCategoryFromHash();
    if (category) scrollElementIntoView(this.getMenuItemByCategory(category));
  }
  // scroll the window for large screen, scroll the content for small screen
  scrollToCategory(category, isSmallScreen) {
    if (!category) return;
    const id = replaceSpace(category);
    const categoryHeader = dom.categoryHeader.getById(id);
    const container = isSmallScreen ? window : this.content;
    container.scrollTo(0, categoryHeader.offsetTop - (isSmallScreen ? this.DY : 0));
    updateHash(id);
  }
  focusOnCategoryMenuItem(fn, container) {
    const isSmall = getIsSmallScreen();
    let item;
    if (isSmall) return;
    if (container.scrollHeight - container.scrollTop - container.clientHeight === 0) {
      item = dom.categoryMenu.getLastItem(this.menu);
    } else {
      item = this.getMenuItemByPosition();
    }
    if (!item) return;
    if (item.classList.contains("highlight")) return;
    const id = replaceSpace(item.dataset.category);
    updateHash(id);
    fn(item.dataset.category);
    scrollElementIntoView(item);
  }
  getMenuItemByPosition() {
    let item = null;
    const centerX = document.documentElement.clientWidth / 2;
    const elem = document.elementFromPoint(centerX, 20);
    const container = dom.getCategoryByElem(elem);
    if (container) {
      const category = container.dataset.category;
      item = this.getMenuItemByCategory(category);
    }
    return item;
  }
  getMenuItemByCategory(category) {
    return dom.categoryMenu.getItemByCategory(this.menu, category);
  }
  update(category, isSmallScreen, newCategory) {
    if (isSmallScreen) {
      this.scrollToCategory(category, isSmallScreen);
    }
    if (newCategory) {
      this.scrollToCategory(newCategory, false);
    }
  }
}
class Wrapper3 {
  constructor(store) {
    this.component = null;
    useSelector(this, store, [selectMenuCategory, selectIsSmallScreen, selectAction, selectLinkCategories]);
    useDispatch(this, store, [changeScreenSize, pickMenuCategory]);
    this.updateActions = {
      "ui/categoryMenuToggled": true,
      "ui/screenSizeChanged": true,
      "links/linkCreated/fulfilled": true
    };
  }
  mount() {
    this.categories = this.selectLinkCategories();
    this.component = new Component(this.changeScreenSize, this.pickMenuCategory);
  }
  update() {
    const action = this.selectAction();
    if (!(action in this.updateActions)) return;
    if (action === "links/linkCreated/fulfilled") {
      const categories = this.selectLinkCategories();
      for (let category of categories) {
        if (!this.categories.includes(category)) {
          this.component.update(null, null, category);
          this.categories = categories;
          return;
        }
      }
    } else {
      this.component.update(this.selectMenuCategory(), this.selectIsSmallScreen());
    }
  }
}
class Content {
  constructor() {
    this.node = dom.getContent();
  }
  update() {
  }
}
function createTemplate$1(category, linksData) {
  let html = "";
  html += `<div class="${LINK_CATEGORY}" data-category="${category}">`;
  html += `<ul class="${LINK_LIST}" data-category="${category}">`;
  linksData.forEach((link) => {
    html += `${createListItemTemplate(link._id, link.src, link.type, link.description)}`;
  });
  html += "</ul>";
  html += "</div>";
  return html;
}
function createListItemTemplate(id, linkSrc, linkType, linkDescription) {
  let html = "";
  html += `<li class="${LINK_LIST_ITEM} ${THEME_LINK}" data-linkid=${id}>`;
  html += `<h3 class=${LINK_LIST_ITEM_CONTENT}>`;
  html += `<span class="${LINK_TYPE} ${THEME_COLOR_MUTE}">${linkType}</span> `;
  html += `<a class="${LINK_TOPIC}" href=${linkSrc} target="_blank">${linkDescription}</a>`;
  html += `<div class="${LINK_CONTROLS} ${LINK_CONTROLS_HIDE} ${LINK_CONTROLS_SM_SC}">`;
  html += `<span><a class="${LINK_BUTTON} ${EDIT_BUTTON} ${THEME_BUTTON}" data-linkid=${id}>&#128393;</a></span>`;
  html += `<span><a class="${LINK_BUTTON} ${REMOVE_BUTTON} ${THEME_BUTTON}" data-linkid=${id}>&#128473;</a></span>`;
  html += "</div>";
  html += "</h3>";
  html += "</li>";
  return html;
}
let prevHoveredItem = null;
class Category {
  constructor(category, linksData, removeLinkAction, openLinkFormAction) {
    this.category = category;
    this.create(category, linksData);
    this.node = dom.getCategory(category);
    this.list = dom.getLinkList(category);
    this.createHover = createHoverEffect();
    this.node.addEventListener("click", (e) => {
      const target = e.target;
      const id = target.dataset.linkid;
      const link = dom.link.get(target);
      if (target === dom.link.getRemoveButton(target)) {
        removeLinkAction(id);
        this.hideLink(target);
      } else if (target === dom.link.getEditButton(target)) {
        openLinkFormAction(id);
        this.selectLink(link, dom.link.getCurrentSelected());
        this.currentId = id;
      } else {
        if (link) this.selectLink(link, dom.link.getCurrentSelected());
      }
    });
    for (let link of this.list.children) {
      this.createHover(link, (...args) => this.hoverLink(...args));
    }
  }
  // pure ui without the store affecting on the component visual state
  selectLink(link, prevLink) {
    if (prevLink) {
      prevLink.classList.remove(`${THEME_LINK_SELECTED}`);
      dom.link.getControls(prevLink).classList.add(`${LINK_CONTROLS_HIDE}`);
    }
    link.classList.add(`${THEME_LINK_SELECTED}`);
    dom.link.getControls(link).classList.remove(`${LINK_CONTROLS_HIDE}`);
  }
  hoverLink(link) {
    if (link.classList.contains(`${THEME_LINK_SELECTED}`)) return;
    const controls = dom.link.getControls(link);
    if (prevHoveredItem !== link) {
      controls.classList.remove(`${LINK_CONTROLS_HIDE}`);
      prevHoveredItem = link;
    } else {
      controls.classList.add(`${LINK_CONTROLS_HIDE}`);
      prevHoveredItem = null;
    }
  }
  highlightLink(link) {
    link.classList.add(`${THEME_LINK_HIGHLIGHT}`);
    setTimeout(() => {
      link.classList.remove(`${THEME_LINK_HIGHLIGHT}`);
    }, 2e3);
  }
  focusLink(link) {
    this.selectLink(link, dom.link.getCurrentSelected());
    if (!isVisible(link)) link.scrollIntoView(false);
    this.highlightLink(link);
  }
  hideLink(target) {
    const link = dom.link.get(target);
    link.style.visibility = "hidden";
  }
  showLink(link) {
    link.style.visibility = "visible";
  }
  // type - stored in filters slice of the store
  arrangeLinksByType(type) {
    const items = Array.from(this.list.children).map((link) => ({ type: dom.link.getType(link).textContent, element: link }));
    const arrangedLinks = items.sort((a, b) => a.type === type ? -1 : 1).map((item) => item.element);
    this.list.append(...arrangedLinks);
  }
  // id - stored in links slice of the store
  removeLink(id) {
    const link = dom.link.getById(this.list, id);
    if (link) {
      const nextLink = link.nextElementSibling;
      if (nextLink) dom.link.getControls(nextLink).classList.remove(`${LINK_CONTROLS_HIDE}`);
      link.remove();
      if (!this.list.children.length) {
        this.node.remove();
        history.pushState(null, null, "");
      }
    }
  }
  // data comes from the links slice of the store
  createLink(data) {
    this.list.insertAdjacentHTML(
      "beforeend",
      createListItemTemplate(data._id, data.src, data.type, data.description)
    );
    const link = dom.link.getLast(this.list);
    this.createHover(link, (...args) => this.hoverLink(...args));
    this.focusLink(link);
  }
  // data comes from the links slice of the store
  updateLink(data) {
    const { _id, src, type, description, category } = data;
    const linkElement = dom.link.getById(document, _id);
    const linkType = dom.link.getType(linkElement);
    const linkTopic = dom.link.getTopic(linkElement);
    linkType.textContent = type;
    linkTopic.src = src;
    linkTopic.textContent = description;
    if (!this.list.contains(linkElement)) this.list.append(linkElement);
    this.showLink(linkElement);
    this.focusLink(linkElement);
  }
  create(category, linksData) {
    dom.getContent().insertAdjacentHTML("beforeend", createTemplate$1(category, linksData));
  }
  update(data) {
    if (data.linkType) this.arrangeLinksByType(data.linkType.type);
    if (data.removedLinkId) this.removeLink(data.removedLinkId);
    if (data.createdLinkData) this.createLink(data.createdLinkData);
    if (data.editedLinkData) this.updateLink(data.editedLinkData);
  }
}
function createTemplate(category, linkTypes) {
  let html = "";
  html += `<h2 id=${replaceSpace(category)} class=${LINK_CATEGORY_HEADER}>`;
  html += `<span>${category}</span>`;
  html += `<span class="${LINK_CATEGORY_HEADER_HIDE} ${LINK_CATEGORY_HEADER_SORTNAME} ${THEME_COLOR_MUTE}">`;
  html += `Arrange by ${createSelect(linkTypes)}`;
  html += "</span>";
  html += "</h2>";
  return html;
}
function createSelect(types) {
  let html = "";
  html += `<select class="${LINK_CATEGORY_HEADER_SELECT}" name="Arrange-by-type">`;
  for (let type of types) {
    html += `<option value=${replaceSpace(type)} data-type="${type}">${type}</option>`;
  }
  html += '<option value="no" selected disabled>Select option</option>';
  html += "</select>";
  return html;
}
function createOption(type) {
  return `<option value=${replaceSpace(type)} data-type="${type}">${type}</option>`;
}
class Header {
  constructor(category, linkTypes, storeAction) {
    this.create(category, linkTypes);
    createHoverEffect()(this.node, () => this.toggleSelect());
    this.node.addEventListener("change", (e) => {
      const category2 = replaceHyphen(this.node.getAttribute("id"));
      const type = replaceHyphen(e.target.value);
      storeAction({ category: category2, type });
    });
  }
  toggleSelect() {
    dom.categoryHeader.getSelect(this.node).parentNode.classList.toggle(`${LINK_CATEGORY_HEADER_HIDE}`);
  }
  removeSelectOption(type) {
    dom.categoryHeader.getOptionByType(this.node, type).remove();
  }
  createSelectOption(type) {
    dom.categoryHeader.getSelect(this.node).insertAdjacentHTML("afterbegin", createOption(type));
  }
  create(category, linkTypes) {
    const categoryElement = dom.getCategory(category);
    categoryElement.insertAdjacentHTML("afterbegin", createTemplate(category, linkTypes));
    this.node = dom.categoryHeader.get(categoryElement);
  }
  update(typeToRemove, typeToCreate) {
    if (typeToRemove) this.removeSelectOption(typeToRemove);
    if (typeToCreate) this.createSelectOption(typeToCreate);
  }
}
class HeaderWrapper {
  constructor(store, category) {
    this.category = category;
    this.component = null;
    this.linkTypes = null;
    useSelector(this, store, [selectLinkTypesByCategory]);
    useDispatch(this, store, [pickCategoryLinkType]);
  }
  mount() {
    const linkTypes = this.selectLinkTypesByCategory(this.category);
    this.component = new Header(this.category, linkTypes, this.pickCategoryLinkType);
    this.linkTypes = linkTypes;
  }
  update() {
    const linkTypes = this.selectLinkTypesByCategory(this.category);
    if (linkTypes.length < this.linkTypes.length) {
      for (let type of this.linkTypes) {
        if (!linkTypes.includes(type)) {
          this.component.update(type);
          this.linkTypes = linkTypes;
          return;
        }
      }
    }
    if (linkTypes.length > this.linkTypes.length) {
      for (let type of linkTypes) {
        if (!this.linkTypes.includes(type)) {
          this.component.update(null, type);
          this.linkTypes = linkTypes;
          return;
        }
      }
    }
  }
}
class CategoryWrapper {
  constructor(store, category) {
    this.store = store;
    this.category = category;
    this.component = null;
    this.child = null;
    useSelector(this, store, [selectLinksByCategory]);
    useDispatch(this, store, [openLinkFormForEditing, removeLink]);
  }
  mount() {
    const links = this.selectLinksByCategory(this.category);
    this.component = new Category(this.category, links, this.removeLink, this.openLinkFormForEditing);
    this.mountChild(this.store, this.category);
  }
  update(data) {
    this.component.update(data);
    this.updateChild();
  }
  mountChild(store, category) {
    this.child = new HeaderWrapper(store, category);
    this.child.mount();
  }
  updateChild() {
    this.child.update();
  }
}
class ContentWrapper {
  constructor(store) {
    this.store = store;
    this.component = null;
    this.children = [];
    useSelector(this, store, [
      selectLinkCategories,
      selectAction,
      selectLinkType,
      selectRemovedLinkId,
      selectRemovedLinkCategory,
      selectCreatedLink,
      selectEditedLink,
      selectLoadingStatus
    ]);
    this.updateActions = {
      "filters/linkTypeSelected": true,
      "links/linkRemoved/fulfilled": true,
      "links/linkCreated/fulfilled": true,
      "links/linkEdited/fulfilled": true
    };
  }
  mount() {
    const categories = this.selectLinkCategories().sort();
    this.component = new Content();
    this.mountChildren(this.store, this.selectLinkCategories().sort());
    this.categories = categories;
  }
  update() {
    const action = this.selectAction();
    if (!(action in this.updateActions)) return;
    this.component.update();
    this.updateChildren(action);
  }
  mountChildren(store, categoryNames) {
    this.children = categoryNames.map((category) => {
      return new CategoryWrapper(store, category);
    });
    this.children.forEach((elm) => elm.mount());
  }
  updateChildren(action) {
    const update = (dataCategory, data) => {
      for (let child of this.children) {
        if (child.category === dataCategory) {
          return child.update(data);
        }
      }
    };
    switch (action) {
      case "filters/linkTypeSelected": {
        const linkType = this.selectLinkType();
        return update(linkType.category, { linkType });
      }
      case "links/linkRemoved/fulfilled": {
        const removedLinkId = this.selectRemovedLinkId();
        const category = this.selectRemovedLinkCategory();
        return update(category, { removedLinkId });
      }
      case "links/linkCreated/fulfilled": {
        const categories = this.selectLinkCategories();
        for (let category of categories) {
          if (!this.categories.includes(category)) {
            const newCategory = new CategoryWrapper(this.store, category);
            newCategory.mount();
            this.children.push(newCategory);
            this.categories = categories;
            return;
          }
        }
        const createdLinkData = this.selectCreatedLink();
        return update(createdLinkData.category, { createdLinkData });
      }
      case "links/linkEdited/fulfilled": {
        const editedLinkData = this.selectEditedLink();
        return update(editedLinkData.category, { editedLinkData });
      }
    }
  }
}
class SettingsMenu {
  constructor(openSettingsWindowAction) {
    this.node = dom.settingsMenu.get();
    this.node.addEventListener("click", (e) => {
      const target = e.target;
      if (dom.settingsMenu.getOpenButton(target)) {
        openSettingsWindowAction();
      }
    });
  }
  create() {
  }
  update() {
  }
}
class SettingsMenuWrapper {
  constructor(store) {
    this.component = null;
    useDispatch(this, store, [openLinkFormForCreation]);
  }
  mount() {
    this.component = new SettingsMenu(this.openLinkFormForCreation);
  }
  update() {
    this.component.update();
  }
}
class SettingsWindow {
  constructor(closeAction) {
    this.node = dom.getSettingsWindow();
    this.node.addEventListener("click", (e) => {
      const target = e.target;
      if (dom.getCloseButton(target)) {
        closeAction();
      }
    });
  }
  toggleWindow() {
    this.node.classList.toggle(`${SETTINGS_WINDOW_HIDE}`);
  }
  create() {
  }
  update() {
    this.toggleWindow();
  }
}
function createOptionsTemplate(items) {
  let html = "";
  for (let item of items) {
    html += `<option value="${item}">${item}</option>`;
  }
  html += `<option value="own">your own...</option>`;
  return html;
}
class LinkFrom {
  constructor(categories, types, createLinkAction, editLinkAction) {
    this.node = dom.linkForm.get();
    this.categorySelect = dom.linkForm.getCategorySelect(this.node);
    this.typeSelect = dom.linkForm.getTypesSelect(this.node);
    this.create(categories, types);
    this.dataTemplate = { src: "", description: "", type: "", category: "" };
    this.node.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;
      if (target === this.node.add) {
        createLinkAction({ ...this.getFormData() });
      } else if (target === this.node.edit) {
        const linkElement = dom.link.getById(document, this.editingLinkId);
        linkElement.style.visibility = "hidden";
        editLinkAction({ ...this.getFormData(), _id: this.editingLinkId });
      }
    });
    this.node.addEventListener("change", (e) => {
      const target = e.target;
      if (target.tagName === "SELECT" && target.value === "own") {
        const input = document.createElement("input");
        input.type = "text";
        input.name = target.name;
        input.className = `${LINK_WINDOW_INPUT}`;
        input.oninput = input.onblur = (e2) => {
          if (!e2.target.value) {
            input.replaceWith(target);
            target.value = "";
          }
        };
        target.replaceWith(input);
      }
    });
  }
  getFormData() {
    const data = { ...this.dataTemplate };
    for (let prop in data) {
      data[prop] = this.node[prop].value;
    }
    return data;
  }
  setFormData(linkData) {
    for (let prop in this.dataTemplate) {
      this.node[prop].value = linkData[prop];
    }
  }
  reset() {
    if (this.node.category.tagName === "INPUT") this.node.category.replaceWith(this.categorySelect);
    if (this.node.type.tagName === "INPUT") this.node.type.replaceWith(this.typeSelect);
    for (let prop in this.dataTemplate) {
      this.node[prop].value = "";
    }
  }
  setCreateionMode() {
    this.reset();
    this.node.edit.classList.add(`${LINK_FORM_BUTTON_HIDE}`);
    this.node.add.classList.remove(`${LINK_FORM_BUTTON_HIDE}`);
  }
  setEditingMode(editedLinkData) {
    this.reset();
    this.editingLinkId = editedLinkData._id;
    this.setFormData(editedLinkData);
    this.node.edit.classList.remove(`${LINK_FORM_BUTTON_HIDE}`);
    this.node.add.classList.add(`${LINK_FORM_BUTTON_HIDE}`);
  }
  create(categories, types) {
    this.categorySelect.innerHTML = createOptionsTemplate(categories);
    this.typeSelect.innerHTML = createOptionsTemplate(types);
  }
  updateOptions(options) {
    const { categories, types } = options;
    this.create(categories, types);
  }
  update(mode, editedLinkData, newOptions) {
    if (mode === "creation") this.setCreateionMode();
    if (mode === "editing") this.setEditingMode(editedLinkData);
    if (newOptions) {
      this.updateOptions(newOptions);
    }
  }
}
class LinkFromWrapper {
  constructor(store) {
    this.component = null;
    this.mode = null;
    useSelector(this, store, [
      selectLinkCategories,
      selectLinkTypes,
      selectLinkFormMode,
      selectLinkForEdit,
      selectAction
    ]);
    useDispatch(this, store, [createNewLink, editPickedLink]);
    this.updateActions = {
      "ui/linkFormModeChanged": true,
      "links/linkRemoved/fulfilled": true,
      "links/linkCreated/fulfilled": true,
      "links/linkEdited/fulfilled": true
    };
  }
  mount() {
    const categories = this.selectLinkCategories();
    const types = this.selectLinkTypes();
    this.component = new LinkFrom(categories, types, this.createNewLink, this.editPickedLink);
    this.categories = categories;
    this.types = types;
  }
  update() {
    const action = this.selectAction();
    switch (action) {
      case "ui/linkFormModeChanged": {
        this.component.update(this.selectLinkFormMode(), this.selectLinkForEdit());
        return;
      }
      case "links/linkRemoved/fulfilled":
      case "links/linkCreated/fulfilled":
      case "links/linkEdited/fulfilled": {
        const categories = this.selectLinkCategories();
        const types = this.selectLinkTypes();
        this.component.update(null, null, { categories, types });
        return;
      }
    }
  }
}
class SettingsWindowWrapper {
  constructor(store) {
    this.store = store;
    this.component = null;
    this.child = null;
    useSelector(this, store, [selectAction]);
    useDispatch(this, store, [closeSettingsWindow]);
    this.updateActions = {
      "ui/settingsWindowToggled": true
    };
  }
  mount() {
    this.component = new SettingsWindow(this.closeSettingsWindow);
    this.mountChild();
  }
  update() {
    const action = this.selectAction();
    if (action in this.updateActions) {
      this.component.update();
    }
    this.updateChild();
  }
  mountChild() {
    this.child = new LinkFromWrapper(this.store);
    this.child.mount();
  }
  updateChild() {
    this.child.update();
  }
}
class UI {
  constructor(store) {
    this.categoryMenu = new Wrapper$2(store);
    this.menuOpener = new Wrapper$1(store);
    this.commonComponent = new Wrapper3(store);
    this.content = new ContentWrapper(store);
    this.settingsMenu = new SettingsMenuWrapper(store);
    this.settingsWindow = new SettingsWindowWrapper(store);
  }
  mount() {
    this.categoryMenu.mount();
    this.menuOpener.mount();
    this.commonComponent.mount();
    this.content.mount();
    this.settingsMenu.mount();
    this.settingsWindow.mount();
  }
  update() {
    this.categoryMenu.update();
    this.content.update();
    this.menuOpener.update();
    this.commonComponent.update();
    this.settingsMenu.update();
    this.settingsWindow.update();
  }
}
async function render() {
  await initiateDB();
  const links = await api.loadLinks();
  const initialData = {
    links: { data: links },
    ui: {
      menuCategory: getCategoryFromHash(),
      isMenuOpened: false,
      isSmallScreen: getIsSmallScreen()
    }
  };
  const store = createStore(initialData);
  const ui = new UI(store);
  ui.mount();
  store.store.subscribe(() => ui.update());
}
render();
