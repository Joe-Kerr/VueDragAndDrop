module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "63e8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helper", function() { return helper; });
const helper = {
    verifyIndexAndContainer(state, indexName, containerName) {
        if(typeof state[indexName] !== "object") {
            throw new Error("Index with name "+indexName+" is not an object in state.");
        } 

        if(!(state[containerName] instanceof Array)) {
            throw new Error("Container with name "+containerName+" is not an array in state.");
        }
    }
}

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getters_namespaceObject = {};
__webpack_require__.r(getters_namespaceObject);
__webpack_require__.d(getters_namespaceObject, "getArrayElWIdxByIdFactory", function() { return getArrayElWIdxByIdFactory; });
var mutations_namespaceObject = {};
__webpack_require__.r(mutations_namespaceObject);
__webpack_require__.d(mutations_namespaceObject, "setPropVal", function() { return setPropVal; });
__webpack_require__.d(mutations_namespaceObject, "setProps", function() { return setProps; });
__webpack_require__.d(mutations_namespaceObject, "setPropsOnObjectFactory", function() { return setPropsOnObjectFactory; });
__webpack_require__.d(mutations_namespaceObject, "setArrayElPropsByIdFactory", function() { return setArrayElPropsByIdFactory; });
__webpack_require__.d(mutations_namespaceObject, "addArrayElementFactory", function() { return addArrayElementFactory; });
__webpack_require__.d(mutations_namespaceObject, "removeArrayElementByIdFactory", function() { return removeArrayElementByIdFactory; });
__webpack_require__.d(mutations_namespaceObject, "resetArrayFactory", function() { return resetArrayFactory; });
var actions_namespaceObject = {};
__webpack_require__.r(actions_namespaceObject);
__webpack_require__.d(actions_namespaceObject, "passThruActionsFactory", function() { return passThruActionsFactory; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/node_modules/cats4vue/src/index.js
/*
Eg:
const defs = {
	prop: {
		type: "string", default: "NS", required: true
	}
};
*/
function configParser(config={}, defaults={}) {
	const result = {};
	for(const name in defaults) {
		const defProp = defaults[name];
		const actualProp = config[name];
		
		const defType = defProp.type;
		const actualType = typeof actualProp;
		
		const isRequired = defProp.required;
		const isProvided = name in config;
		
		if(typeof defType === "undefined") {throw new Error("type property on default is missing");}
		
		if(isRequired && !isProvided) {throw new Error("Config property '"+name+"' is required but not provided.");}
		
		if(isProvided && defType !== null && actualType !== defType) {throw new Error("Config property '"+name+"' must be of type '"+defType+"' but is of type '"+actualType+"'.");}
				
		result[name] = (isProvided) ? actualProp : defProp.default;
	}
	
	const mismatch = [];
	for(const name in config) {
		if(!(name in defaults)) {mismatch.push(name);}
	}
	if(mismatch.length > 0) {console.warn("The following config property was / properties were provided for which no defaults exist: "+mismatch.toString());}
	
	return result;
}

//https://vuejs.org/v2/style-guide/#Private-property-names-essential
function isValidPrivateProperty(prop) {
	return (prop[0] === "$") && (prop[1] === "_") && (prop.substring(2).indexOf("_") > -1);
}

function isValidRootProperty(prop, throwInsteadOfReturn=false) {
	if(typeof prop !== "string") {
		if(throwInsteadOfReturn === true) {
			throw new Error("Tried to write a non-string property to the object root.");
		}
		return false;
	}
	
	//https://vuejs.org/v2/api/#Options-Data (left panel)
	const reserved = [
		"data", 
		"props", 
		"propsData", 
		"computed", 
		"methods", 
		"watch", 
		"el", 
		"template", 
		"render", 
		"renderError", 
		"beforeCreate", 
		"created", 
		"beforeMount", 
		"mounted", 
		"beforeUpdate", 
		"updated", 
		"activated", 
		"deactivated", 
		"beforeDestroy", 
		"destroyed", 
		"errorCaptured", 
		"directives", 
		"filters", 
		"components", 
		"parent", 
		"mixins", 
		"extends", 
		"provide", 
		"inject", 
		"name", 
		"delimiters", 
		"functional", 
		"model", 
		"inheritAttrs", 
		"comments"	
	];
	const check = (reserved.indexOf(prop) === -1);
	
	if(check === false && throwInsteadOfReturn === true) {
		throw new Error("Adding property to object root failed. '"+prop+"' is a reserved Vue property.");
	}
	
	return check;
}

function componentOptionsWriter(component, componentOptions) {
	for(const name in componentOptions) {
		if(name in component) {
			throw new Error("Tried to write property on component that already exists: "+name);
		}
		
		if(!isValidPrivateProperty(name)) {
			throw new Error("Private property names should be in the form of: $_namespace_propertyName. This is important especially for plugins in order to avoid name collisions. See also https://vuejs.org/v2/style-guide/#Private-property-names-essential");
		}

		component[name] = componentOptions[name];
	}
}

function renameComponent(component, name) {
	if(typeof name !== "string") {
		throw new Error("'name' parameter must be of type string. Got: "+typeof name);
	}
	
	if(typeof component !== "object" || !("name" in component)) {
		throw new Error("'component' parameter must be an object with the property name.");
	}
	
	component.name = name;
}

function registerVuexModule(vuex, namespace, vuexModule) {
	if(typeof namespace !== "string") {
		throw new Error("namespace parameter must be of type string.");
	}	
	
	if(typeof vuexModule !== "object") {
		throw new Error("module parameter must be of type object.");
	}
	
	const haveAtLeastOne = ["state", "getters", "mutations", "actions", "modules"];
	let hasHowMany = 0;
	haveAtLeastOne.forEach((prop)=>{
		if(vuexModule.hasOwnProperty(prop)) {hasHowMany++}
	});
	
	if(hasHowMany === 0) {
		throw new Error("Vuex module is of unexpected structure. Expected to see at least one of: "+haveAtLeastOne.toString(","));
	}
	
	if(typeof vuex === "undefined" || typeof vuex.dispatch === "undefined") {
		throw new Error(`Plugin ${namespace} requires vuex instance as config parameter: Vue.use(${namespace}, {vuex: instanceOfVuex}).`);
	}		
	
	vuex.registerModule(namespace, vuexModule);
}

function ensureVersion(Vue, minVersion, options={}) {
	if(!("version" in Vue)) {
		throw new Error("The version property is missing on the Vue instance.");
	}
	
	if(Vue.version.replace(/[0-9\.]/g, "").length > 0) {
		throw new Error("Vue version is not in a dot-separated format. Got: "+Vue.version);
	}
		
	if((""+minVersion).replace(/[0-9\.]/g, "").length > 0) {
		throw new Error("The required version is not in a dot-separated format. Got: "+Vue.version);
	}
	
	const vueVersion = Vue.version.split(".").map((subver)=>parseInt(subver));
	const reqVersion = minVersion.split(".").map((subver)=>parseInt(subver));
	const throwInsteadOfReturn = (options.throwInsteadOfReturn !== undefined) ? options.throwInsteadOfReturn : false;
	let result = true;
	
	//Below loop can return before recognising invalid number.
	reqVersion.forEach((subver)=>{
		if(typeof subver !== "number" || isNaN(subver)) {
			throw new Error("The required version is not in the format x, x.y or x.y.z. Got: "+minVersion);
		}
	});
	
	if(reqVersion.length > 3 || reqVersion.length < 1) {
		throw new Error("The required version is not in the format x, x.y or x.y.z. Got: "+minVersion);
	}
	
	for(let i=0, ii=reqVersion.length; i<ii; i++) {
		const actual = vueVersion[i];
		const expected = reqVersion[i];
		
		if(actual === expected) {
			continue;
		}
		
		result = (actual < expected) ? false : true;
		break;
	}
	
	if(result === false && throwInsteadOfReturn === true) {
		throw new Error("You do not have the required Vue version of "+minVersion+". You have: "+Vue.version);
	}
	
	return result;
}

const cats4Vue = {
	configParser, 
	isValidPrivateProperty, 
	isValidRootProperty,
	componentOptionsWriter, 
	renameComponent, 
	registerVuexModule,
	ensureVersion
};

/* harmony default export */ var src = (cats4Vue);
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/directive.js
var notifyStore;

function getMode(arg) {
  if (arg !== "draggable" && arg !== "droppable") {
    throw new Error("Invalid directive argument. Use v-drag&drop:draggable|droppable. Got: " + arg);
  }

  return arg;
}

function getEl(el) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (value.selector === undefined) {
    return el;
  }

  var newEl = document.getElementById(value.selector);

  if (newEl === null) {
    throw new Error("Directive option 'selector' (" + value.selector + ") did not return a DOM element.");
  }

  return newEl;
}

function getConfig(context, mode) {
  var params = context.value || {};
  var config = {
    mode: mode,
    type: params.type,
    greedy: context.modifiers.greedy === true,
    draggableOnly: context.modifiers.only === true,
    drag: params.drag,
    dragstop: params.dragstop,
    dragstart: params.dragstart
  };
  return config;
}

function getData() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return value.data || {};
}

function storeCallback(event, data) {
  var map = {
    mousedown: "draggable",
    mouseup: "droppable",
    mouseupAlways: "done"
  };
  var command = map[event];

  if (command === undefined) {
    throw new Error("Received undefined event in draggable or droppable callback: " + event);
  }

  notifyStore(command, data);
}

function dragAndDrop(store, DragAndDrop) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var dragAndDrop = new DragAndDrop();
  var namespace = options.namespace;

  notifyStore = function notifyStore(action, data) {
    store.dispatch(namespace + "/" + action, data);
  }; //context.arg = v-dir:arg
  //context.value = v-dir="value"
  //context.modifiers = v-dir.mod1.mod2...


  return {
    inserted: function inserted(el, context, vnode) {
      var elHandle = el;
      var mode = getMode(context.arg);
      var data = getData(context.value);
      var elMoving = getEl(elHandle, context.value);
      var config = getConfig(context, mode);
      dragAndDrop.addEventListener(elHandle, elMoving, config, data, storeCallback);
    },
    unbind: function unbind(el, context, vnode) {
      dragAndDrop.removeEventListener(context.arg, el);
    }
  };
}

/* harmony default export */ var directive = (dragAndDrop);
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/DragAndDrop.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var clone = null;
var dragging;
var dragAndDropParameters = {
  startX: null,
  startY: null,
  endX: null,
  endY: null,
  curX: null,
  curY: null,
  draggableEl: null,
  draggableX: null,
  draggableY: null,
  draggableNewX: null,
  draggableNewY: null,
  draggableType: null,
  draggableData: null,
  droppableEl: null,
  droppableX: null,
  droppableY: null,
  droppableType: null,
  droppableData: null,
  _cloneStartX: null,
  _cloneStartY: null
};
Object.defineProperty(dragAndDropParameters, "elDraggable", {
  get: function get() {
    console.error("DEPRECATED: use dragAndDropParameters.draggableEl instead of .elDraggable");
    return dragAndDropParameters.draggableEl;
  },
  enumerable: false
});
Object.defineProperty(dragAndDropParameters, "elDroppable", {
  get: function get() {
    console.error("DEPRECATED: use dragAndDropParameters.droppableEl instead of .elDroppable");
    return dragAndDropParameters.droppableEl;
  },
  enumerable: false
});

var defaultDragging = function defaultDragging(_event) {
  var dnd = dragAndDropParameters;
  dnd.curX = _event.pageX;
  dnd.curY = _event.pageY;
  var deltaX = dnd.curX - dnd.startX;
  var deltaY = dnd.curY - dnd.startY;
  dnd.draggableNewX = dnd.draggableX + deltaX;
  dnd.draggableNewY = dnd.draggableY + deltaY;

  if (clone === null) {
    return;
  }

  clone.style.left = dnd._cloneStartX + deltaX + "px";
  clone.style.top = dnd._cloneStartY + deltaY + "px";
};

var DragAndDrop =
/*#__PURE__*/
function () {
  function DragAndDrop() {
    _classCallCheck(this, DragAndDrop);

    /// draggables
    this.isDragging = false;
    this.draggableGotRemoved = false; /// droppables

    this.processingDroppables = false;
    this.droppables = []; ///misc

    this.styleBackup = null;
    this.listeners = [];
  }

  _createClass(DragAndDrop, [{
    key: "_getRect",
    value: function _getRect(el) {
      var originalRect = el.getBoundingClientRect();
      var elPos = window.getComputedStyle(el).position;
      var x = elPos === "fixed" ? originalRect.x + window.pageXOffset : originalRect.x;
      var y = elPos === "fixed" ? originalRect.y + window.pageYOffset : originalRect.y;
      return {
        x: x,
        y: y,
        width: originalRect.width,
        height: originalRect.height
      };
    } /// Not really carbon copy since, as it turns out, some more "elaborate" css will not be copied. See e.g. https://stackoverflow.com/questions/1848445/duplicating-an-element-and-its-style-with-javascript
    ///  Solutions are not really great. For now, leave it as heuristic carbon copy.

  }, {
    key: "_createCopyClone",
    value: function _createCopyClone(el, event, rect) {
      var clone = el.cloneNode(true);
      var style = document.defaultView.getComputedStyle(el, null);
      clone.style.color = style.color;
      clone.style.backgroundColor = style.backgroundColor;
      clone.style.border = style.border;
      clone.style.borderRadius = style.borderRadius;
      clone.style.margin = "0px";
      clone.style.opacity = 0.6;
      return clone;
    }
  }, {
    key: "_createCheapClone",
    value: function _createCheapClone(el, event, rect) {
      var clone = el.cloneNode(false); //low performance grey box

      clone.style.border = "1px solid yellow";
      clone.style.boxShadow = "box-shadow: 0px 0px 9px 5px rgba(231,166,26,1)";
      clone.style.backgroundColor = "#eeeeee";
      return clone;
    }
  }, {
    key: "_setupClone",
    value: function _setupClone(el, event) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (type === null) {
        return;
      }

      var originalRect = this._getRect(el);

      var x = originalRect.x;
      var y = originalRect.y;
      clone = type === "copy" ? this._createCopyClone(el, event, originalRect) : this._createCheapClone(el, event, originalRect);
      clone.id = "cloned_" + clone.id;
      clone.style.left = x + "px";
      clone.style.top = y + "px";
      clone.style.width = originalRect.width + "px";
      clone.style.height = originalRect.height + "px";
      clone.style.pointerEvents = "none"; //!!

      clone.style.position = "absolute";
      event._cloneStartX = x;
      event._cloneStartY = y;
      document.body.appendChild(clone);
    }
  }, {
    key: "_setTempStyle",
    value: function _setTempStyle() {
      this.styleBackup = document.body.style.userSelect;
      document.body.style.userSelect = "none";
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.isDragging = false;
      this.draggableGotRemoved = false;

      for (var p in dragAndDropParameters) {
        dragAndDropParameters[p] = null;
      }

      if (clone !== null) {
        document.body.removeChild(clone);
        clone = null;
      }

      document.body.style.userSelect = this.styleBackup;
      document.removeEventListener("mousemove", dragging);
      dragging = null;
      this.styleBackup = null;
    }
  }, {
    key: "_evaluateDropOnSelf",
    value: function _evaluateDropOnSelf(self, droppables) {
      for (var i = 0, ii = droppables.length; i < ii; i++) {
        if (droppables[i].el === self) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "_verifyMode",
    value: function _verifyMode(mode) {
      if (mode !== "draggable" && mode !== "droppable") {
        throw new Error("mode parameter must be 'draggable' or 'droppable'. Got: " + mode);
      }
    }
  }, {
    key: "_parseConfig",
    value: function _parseConfig(config) {
      this._verifyMode(config.mode);

      if (typeof config.greedy !== "boolean") {
        config.greedy = false;
      }

      if (typeof config.draggableOnly !== "boolean") {
        config.draggableOnly = false;
      }

      if (config.type === undefined && config.greedy === false && config.draggableOnly === false) {
        throw new Error("Directive requires 'type' value unless modifiers draggable.only OR droppable.greedy are given.");
      }

      config.delegate = document.getElementById(config.delegate);
      var isDraggable = config.mode === "draggable";
      config.draggableType = isDraggable ? config.type : null;
      config.droppableType = !isDraggable ? config.type : null;
    } //document.body.contains(dndParams.draggableEl) //should I check for "illegal" removes? As Vue plugin probably not; as D&D class probably yes  #todo

  }, {
    key: "_evaluateDroppableWatcher",
    value: function _evaluateDroppableWatcher(event, config, dndParams, callback) {
      if (this.draggableGotRemoved === false) {
        var selfIdx = this._evaluateDropOnSelf(dndParams.draggableEl, this.droppables);

        for (var i = 0, ii = this.droppables.length; i < ii; i++) {
          var droppable = this.droppables[i];
          var isDropOverSelf = selfIdx === i;

          if (isDropOverSelf) {
            continue;
          }

          config.droppableType = droppable.type;

          this._writeDroppableParameters(dndParams, droppable.el, event, config, droppable.data);

          callback("mouseup", dndParams);

          if (droppable.greedy) {
            break;
          }
        }

        if (typeof config.dragstop === "function") {
          this._writeDroppableParameters(dndParams, event.target, event, config, null);

          config.dragstop("mouseup", dndParams);
        }
      }

      this.droppables.splice(0, this.droppables.length);
      this.processingDroppables = false;
      callback("mouseupAlways", dndParams);

      this._reset();
    }
  }, {
    key: "_initDroppableWatcher",
    value: function _initDroppableWatcher(config, dndParams, callback) {
      if (this.processingDroppables) {
        return;
      }

      var _this = this;

      document.addEventListener("mouseup", function inlineCallbackOnce(event2) {
        setTimeout(function () {
          _this._evaluateDroppableWatcher(event2, config, dndParams, callback);
        }, 1);
        document.removeEventListener("mouseup", inlineCallbackOnce, true);
      }, true);
      this.processingDroppables = true;
    }
  }, {
    key: "_writeDroppableParameters",
    value: function _writeDroppableParameters(params, el, event, config, data) {
      var dom = el !== document ? el : el.body;

      var xy = this._getRect(dom);

      params.droppableEl = dom;
      params.droppableData = data;
      params.droppableType = config.droppableType;
      params.droppableX = xy.x;
      params.droppableY = xy.y;
      params.endX = event.pageX;
      params.endY = event.pageY;
    }
  }, {
    key: "_writeDraggableParameters",
    value: function _writeDraggableParameters(params, el, event, config, data) {
      var dom = el !== document ? el : el.body;

      var xy = this._getRect(dom);

      params.startX = event.pageX;
      params.startY = event.pageY;
      params.curX = event.pageX;
      params.curY = event.pageY;
      params.draggableData = data;
      params.draggableType = config.draggableType;
      params.draggableEl = dom;
      params.draggableX = xy.x;
      params.draggableY = xy.y;
      params.draggableNewX = params.draggableX;
      params.draggableNewY = params.draggableY;
    }
  }, {
    key: "_mouseup",
    value: function _mouseup(el, event, config, data) {
      this.droppables.push({
        el: el,
        data: data,
        type: config.droppableType,
        greedy: config.greedy
      });
    }
  }, {
    key: "_mousedown",
    value: function _mousedown(el, event, config, data, callback) {
      this.isDragging = true;

      this._writeDraggableParameters(dragAndDropParameters, el, event, config, data);

      this._initDroppableWatcher(config, dragAndDropParameters, callback);

      this._setupClone(el, dragAndDropParameters, "copy");

      this._setTempStyle();

      if (data.options !== undefined && data.options.dragging !== undefined) {
        config.drag = data.options.dragging;
        console.error("DEPRECATED: do not use 'data.options.dragging' but 'config.drag'");
      }

      if (typeof config.drag === "function") {
        dragging = config.drag;
      } else {
        dragging = defaultDragging;
      }

      document.addEventListener("mousemove", dragging);
      callback("mousedown", dragAndDropParameters);

      if (typeof config.dragstart === "function") {
        config.dragstart("mousedown", dragAndDropParameters);
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(elSource, elMoving, config, data, _callback) {
      var _this2 = this;

      this._parseConfig(config);

      var mode = config.mode;
      var id = this.listeners.length;

      if (mode === "draggable") {
        var callback = config.draggableOnly === false ? _callback : function () {};
        this.listeners[id] = {
          cb: function cb(event) {
            _this2._mousedown(elMoving, event, config, data, callback);
          },
          el: elSource
        };
        elSource.addEventListener("mousedown", this.listeners[id].cb);
      } else if (mode === "droppable") {
        this.listeners[id] = {
          cb: function cb(event) {
            _this2._mouseup(elMoving, event, config, data);
          },
          el: elSource
        };
        elSource.addEventListener("mouseup", this.listeners[id].cb);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(mode, el) {
      this._verifyMode(mode);

      var success = false;
      var listeners = this.listeners;

      if (this.isDragging) {
        this.draggableGotRemoved = true;
      }

      for (var i = 0, ii = listeners.length; i < ii; i++) {
        if (listeners[i].el == el) {
          var event = mode === "draggable" ? "mousedown" : "mouseup";
          el.removeEventListener(event, listeners[i].cb);
          listeners[i].el = null;
          listeners[i].cb = null;
          listeners.splice(i, 1);
          success = true;
          break;
        }
      }

      if (!success) {
        //console.error({el, mode});
        throw new Error("Failed to remove event listener in unbind hook. This may cause a memory leak.");
      }
    }
  }]);

  return DragAndDrop;
}();

/* harmony default export */ var src_DragAndDrop = (DragAndDrop);
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/node_modules/vuex-heman/src/getters.js
const {helper} = __webpack_require__("63e8");

function getArrayElWIdxById(container, index, noResult) {
	return (id) => {
		const idx = index[id];
		
		if(typeof idx !== "number") {
			return noResult;
		}

		return container[idx];
	}
}

/// Factory function that can be adapted to your Vuex state and that returns a getter function. The getter returns the element with the id provided from the state's container.
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// @function getArrayElWIdxByIdFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {var} [settings.noResult=null] - Return this value if id is not found.
/// @returns {var} - Returns null or a user provided value.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element", data: 123}], nameOfIndex: {2:0}},
///    getters: {
///    getElementById: getArrayElWIdxByIdFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the getter</caption>
/// store.getters.getElementById(2);
const getArrayElWIdxByIdFactory = function getArrayElWIdxByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	const noResult = ("noResult" in settings) ? settings.noResult : null;
	
	return function generatedGetArrayElWIdxById(state) {
		helper.verifyIndexAndContainer(state, index, container);
		return getArrayElWIdxById(state[container], state[index], noResult);
	}
}
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/node_modules/vuex-heman/src/mutations.js
const {helper: mutations_helper} = __webpack_require__("63e8");

/// The mutation sets a state property.
/// @function setPropVal
/// @throws Throws for undefined properties - after all valid properties have been set.
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    mutations: {
///    set: setPropVal
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {prop: "propA", val: 3});
const setPropVal = function setPropVal(state, data) {	
	if(typeof data === "undefined" || !("prop" in data) || !("val" in data)) {
		throw new Error("Missing property on data parameter: provide 'prop' and 'val'.");
	}
	
	if(!(data.prop in state)) {
		throw new Error("Tried to set non-existing property: "+data.prop);
	}
	
	state[data.prop] = data.val;
}

/// Private function used by {@link setProps}, {@link setPropsOnObjectFactory}, {@link setArrayElPropsByIdFactory} to handle object (nested) and array property values.
/// @function setPropsHandleObject
/// @param {object} state - Vuex state object of mutation.
/// @param {object} data - Your data passed to the mutation.
/// @param {string} [data.arrOp=undefined] - The operation that should happen when a property value is an array. Available:<br>
/// - push: same as array.push<br>
/// - pop: same as array.pop<br>
/// - shift: same as array.shift<br>
/// - unshift: same as array.unshift<br>
/// - insert: value needs to be an object {value, element|index} where value is the actual value to insert and index or element the location to insert to<br>
/// - delete:  deletes value of array property<br>
/// @param {string} [data.objOp=undefined] - The operation that should happen when a property value is an object. Available: "recur" which sets object recursively.
/// @param {string} propName - Interal helper
/// @example
/// { state: {propA: 1, propB: {subPropC: 2, subPropD: 3}, propE: [1,2,3]},
///   mutations: { set: setProps
/// }
/// //...
/// store.commit("set", {propE: ["a", "b", "c"]} // replaces array of propE
/// store.commit("set", {propE: "four", arrOp: "push"}) // appends "four" to propE
/// store.commit("set", {propB: {subPropD: 4}, objOp: "recur"}) // sets subPropD to 4
/// store.commit("set", {propE: {value: 1.5, element: 2}, arrOp: "insert"}) // inserts 1.5 before 2 in propE array
function setPropsHandleObject(state, data, propName) {
	if(state[propName] instanceof Array && "arrOp" in data) {
		switch(data.arrOp) {
			case "push": 
				state[propName].push(data[propName]);
				break;
				
			case "unshift": 
				state[propName].unshift(data[propName]);			
				break;
				
			case "pop": 
				state[propName].pop();
				break;
				
			case "shift": 
				state[propName].shift();
				break;
				
			case "insert":
				const insertDetails = data[propName];
				const array = state[propName];
				
				if(typeof insertDetails !== "object") {
					throw new Error("Failed to insert: the property value must be an object with properties value and index or element.");
				}
				
				const {value, index, element} = insertDetails;
				
				if(typeof index !== "number" && element === undefined) {
					throw new Error("Failed to insert: either provide on the property value an index property (number) or an element to insert at.");
				}
				
				const i = (typeof index === "number") ? index : array.indexOf(element);
				if(i>-1) {
					array.splice(i, 0, value);
				}
				else {
					throw new Error("Failed to insert: the element property to insert at does not exist in the array.");
				}
				break;
				
			case "delete":
				const i2 = state[propName].indexOf(data[propName]);
				if(i2 > -1) {
					state[propName].splice(i2, 1);
				}
				else {
					throw new Error("Failed to delete: the element to delete does not exist in the array.");
				}
				break;

			
			default:
				throw new Error("Unknown array operation provided: "+data.arrOp);
			break;
		}
	}
	
	else if(data.objOp === "recur") {
		setProps(state[propName], data[propName]);
	}
	
	else {
		state[propName] = data[propName];
	}
}

/// The mutation sets state properties by key/val pairs on the data parameter. See {@link setPropsHandleObject} how object/array values can be handled.
/// @function setProps
/// @throws Throws for undefined properties - after all valid properties have been set.
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    mutations: {
///    set: setProps
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {propA: 2, propB: 3});
const setProps = function setProps(state, data) {
	const err = [];
	for(const prop in data) {
		if(prop === "arrOp" || prop === "objOp") {continue};
		
		if(!(prop in state)) {
			err.push(prop);
			continue;
		}
		
		if(typeof state[prop] !== "object") {
			state[prop] = data[prop];
		}
		else {
			setPropsHandleObject(state, data, prop);
		}
	}

	if(err.length > 0) {
		throw new Error("Tried to set at least one non-existing property: "+err.join(","));
	}	
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation sets the properties of an object on the state. See {@link setPropsHandleObject} how object/array values can be handled.
/// @function setPropsOnObjectFactory
/// @param {object} settings - Configuration.
/// @param {string} settings.object - The name of the object on the state.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {someObject: {propA: 2, propB: 5}},
///    mutations: {
///    set: setPropsOnObjectFactory({object: "someObject"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {propA: 123, propB: 456});
const setPropsOnObjectFactory = function setPropsOnObjectFactory(settings={}) {
	const object = settings.object;
	
	if(object === undefined) {
		throw new Error("Missing mandatory settings parameter 'setting.object'");
	}
	
	return function generatedSetPropsOnObject(state, data) {
		if(!(object in state)) {
			throw new Error("The object with the name on the state does not exist: "+object);
		}
		
		setProps(state[object], data);
	}
}

function setArrayElPropsById(container, index, props) {
	const id = props.id;
	if(typeof id === "undefined") {
		throw new Error("Missing id on data parameter.");
	}
	
	const idx = index[id]
	if(typeof idx === "undefined") {
		throw new Error("Id not found in index while setting prop/s on element: "+JSON.stringify(props));
	}

	const el = container[idx];
	delete props.id;
	
	setProps(el, props);
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation sets the properties of an element within an array to the given values. See {@link setPropsHandleObject} how object/array values can be handled.
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// Assumes that the update data provided to the mutation have an id property.
/// @function setArrayElPropsByIdFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element", data: 123}], nameOfIndex: {2:0}},
///    mutations: {
///    set: setArrayElPropsByIdFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("set", {id: 2, name: "newName", data: 456});
const setArrayElPropsByIdFactory = function setArrayElPropsByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	
	return function generatedSetArrayElPropsById(state, data) {			
		mutations_helper.verifyIndexAndContainer(state, index, container);	
		setArrayElPropsById(state[container], state[index], data);
	}	
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation adds an element to an array. 
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// Assumes that the element provided to the mutation has an id property.
/// @function addArrayElementFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element"}], nameOfIndex: {2:0}},
///    mutations: {
///    add: addArrayElementFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("add", {id: 3, name: "newElement"});
const addArrayElementFactory = function addArrayElementFactory(settings={}) {
	const container = settings.container || "container";
    const index = settings.index || "index";

    return function generatedAddArrayElement(state, data) {
        mutations_helper.verifyIndexAndContainer(state, index, container);	
		
		if(!("id" in data)) {
			throw new Error("Failed to add element because it has no id: "+JSON.stringify(data));
		}

		const newIdx = state[container].push(data) - 1;
        state[index][data.id] = newIdx;
    }
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation removes an element from an array. 
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// @function removeArrayElementByIdFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element"}], nameOfIndex: {2:0}},
///    mutations: {
///    delete: removeArrayElementByIdFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("delete", {id: 2});
const removeArrayElementByIdFactory = function removeArrayElementByIdFactory(settings={}) {
	const container = settings.container || "container";
    const index = settings.index || "index";
    
    return function generatedRemoveArrayElementById(state, data) {
        mutations_helper.verifyIndexAndContainer(state, index, container);
		
		const id = data.id;
		const theContainer = state[container];
		const i = state[index][id];

        if(theContainer[i] === undefined) {
            throw new Error("Delete failed. Tried to remove id from undefined index: "+i);
        }

		theContainer.splice(i, 1);
		delete state[index][id];

		for(let r=i, rr=theContainer.length; r<rr; r++) {
			state[index][theContainer[r].id] = r;
		}
    }
}

function resetArrayFast(state, containerName, elements) {
	state[containerName] = elements;
}

function resetArrayPreserving(container, elements) {
	container.splice(0, container.length);
	container.push(...elements);
}

/// Factory function that can be adapted to your Vuex state and that returns a mutation function. The mutation empties or replaces the container array. 
/// Assumes that you have on your state an array container and an index object holding id/array index pairs.
/// Assumes that you do not use the index as reactive property.
/// @function resetArrayFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {bool} [settings.preserveReference=true] - Should the array be overridden (faster) or spliced (slower) to preserve references? Beware: overriding breaks reactivity.
/// @returns {function} - Returns a Vuex mutation function.
/// @example <caption>Using the factory function</caption>
/// { state: {nameOfContainer: [{id: 2, name: "element"}], nameOfIndex: {2:0}},
///    mutations: {
///    reset: resetArrayFactory({container: "nameOfContainer", index: "nameOfIndex"}),
/// }}
/// @example <caption>Using the mutation</caption>
/// store.commit("reset", {elements: [{id: 3, name: "replacement"}]); //replace
/// store.commit("reset"); //empty
const resetArrayFactory = function resetArrayFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	const preserveReference = ("preserveReference" in settings) ? settings.preserveReference : true;
    
    return function generatedResetArray(state, data=[]) {
		mutations_helper.verifyIndexAndContainer(state, index, container);

		const theContainer = state[container];
		const elements = data.elements || [];

		(preserveReference) ? resetArrayPreserving(theContainer, elements) : resetArrayFast(state, container, elements);

		state[index] = {};
		for(let r=0, rr=theContainer.length; r<rr; r++) {
			state[index][theContainer[r].id] = r;
		}		
	}
}
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/node_modules/vuex-heman/src/actions.js
/// The factory returns simple 'passthrough' actions that only call mutations.
/// @function passThruActionsFactory
/// @param {(string|string[]|object)} names - A single name of an action/commit, an array of action/commit names or an object of action name/commit name pairs.
/// @returns {(function|object)} - Returns an action function (if param string) or an object of functions (if param object/array).
/// @example <caption>Using the factory function</caption>
/// { state: {propA: 1, propB: 2},
///    actions: {
///    anAction: passThruActionsFactory("doSth"),
///    ...passThruActionsFactory(["doA", "doB"]),
///    ...passThruActionsFactory({actionA: "commitB"})
/// }}
/// @example <caption>Equivalent - parameter string</caption>
/// passThruActionsFactory("doSth")
/// doSth(store, data, options) {store.commit("doSth", data, options);}
/// @example <caption>Equivalent - parameter array</caption>
/// passThruActionsFactory(["doA", "doB"])
/// doA(store, data, options) {store.commit("doA", data, options);},
/// doB(store, data, options) {store.commit("doB", data, options);}
/// @example <caption>Equivalent - parameter object</caption>
/// passThruActionsFactory({actionA: "commitA"})
/// actionA(store, data, options) {store.commit("commitA", data, options);}
const passThruActionsFactory = function passThruActionsFactory(names) {
	
	if(typeof names === "string") {
		return function generatedPassThruAction(store, data, options) {
			store.commit(names, data, options);
		}
	}
	
	if(names instanceof Array) {
		const obj = {};
		names.forEach((name)=>{			
			if(typeof name !== "string") {
				throw new Error("Expected element of array to be of type string. Got: "+typeof name);
			}
			obj[name] = function generatedPassThruAction(store, data, options) {
				store.commit(name, data, options);
			}			
		});
		return obj;
	}
	
	if(typeof names === "object") {
		for(const name in names) {
			const methodName = name;
			const commandName = names[name];			
			names[methodName] = function generatedPassThruAction(store, data, options) {
				store.commit(commandName, data, options);
			}
		}	
		return names;
	}
	
	throw new Error("Expected parameter to be of type string, object or array. Got: "+typeof names);
}
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/node_modules/vuex-heman/src/store.crudContainerFactory.js




let id = 1;

/// The factory returns a store module preset. The preset contains a container array intended to hold elements as well as associated CRUD functions.
/// Notice that keeping the default names of store components for non-namespaced containers will result in duplicate commit/dispatch calls. Make sure to provide unique names to non-namespaced modules.
/// @function crudContainerFactory
/// @param {object} settings - Configuration.
/// @param {string} [settings.container="container"] - The name of the container.
/// @param {string} [settings.index="index"] - The name of the index.
/// @param {string} [settings.adderName="add"] - The name of the action/mutation that adds an element.
/// @param {string} [settings.getterName="getById"] - The name of the action/mutation that gets an element.
/// @param {string} [settings.setterName="set"] - The name of the action/mutation that sets a property of an element.
/// @param {string} [settings.deleterName="delete"] - The name of the action/mutation that deletes an element.
/// @param {string} [settings.resetterName="reset"] - The name of the action/mutation that resets the element container.
/// @param {bool} [settings.namespaced=true] - Vuex "namespaced" property.
/// @param {object} settings.extend - A Vuex store object (state, getters, mutations and/or actions) that extends the CRUD container. 
/// @returns {object} - A Vuex store object. 
function crudContainerFactory(settings={}) {
    console.warn("Experimental. Do not use in production.");

    const namespaced = ("namespaced" in settings) ? settings.namespaced : true;

	const container = settings.container || "container";
    const index = settings.index || "index";
    const adderName = settings.adderName || "add";    
    const getterName = settings.getterName || "getById";    
    const setterName = settings.setterName || "set";  
    const deleterName = settings.deleterName || "delete"; 
    const resetterName = settings.resetterName || "reset";

    const incrementIdName = "incrementId"+id;
    const nextIdName = "nextId"+id;
    id++;
    
    const extend = settings.extend || {};

    const actionsMap = {};
    actionsMap[setterName] = setterName;
    actionsMap[deleterName] = deleterName;

    const store = {namespaced, state: {}, getters: {}, mutations: {}, actions: {}};

    store.state[container] = [];
    store.state[index] = {};
    store.state[nextIdName] = 1;

    store.getters[getterName] = getArrayElWIdxByIdFactory({container, index});

    store.mutations[adderName] = addArrayElementFactory({container, index});
    store.mutations[setterName] = setArrayElPropsByIdFactory({container, index});
    store.mutations[deleterName] = removeArrayElementByIdFactory({container, index});
    store.mutations[resetterName] = resetArrayFactory({container, index});
    store.mutations[incrementIdName] = function incrementId(state, data) {
		if(typeof data !== "undefined" && "baseId" in data) {
			state[nextIdName] = data.baseId;
		}
		state[nextIdName]++;
	};

    store.actions = {...passThruActionsFactory(actionsMap)};
    
	store.actions[adderName] = function generatedAdderAction(store, element) {
        element.id = store.state[nextIdName];

        store.commit(adderName, element);
        store.commit(incrementIdName);

        //return store.getters.getElementById(element.id);
        return element;
    }

	store.actions[resetterName] = function generatedResetterAction(store, data=[]) {
		let maxId = 0;
		
		if("elements" in data) {
			data.elements.forEach((el)=>{
				if(el.id > maxId) {
					maxId = el.id;
				}
			});	
			
			if(typeof maxId !== "number" || isNaN(maxId)) {
				maxId = 0;
			}
		}

		store.commit(incrementIdName, {baseId: maxId});
		store.commit(resetterName, data);
	}

    if("state" in extend) {Object.assign(store.state, extend.state);}
    if("getters" in extend) {Object.assign(store.getters, extend.getters);}
    if("mutations" in extend) {Object.assign(store.mutations, extend.mutations);}
    if("actions" in extend) {Object.assign(store.actions, extend.actions);}

    return store;
}
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/node_modules/vuex-heman/src/index.js
/** 
* @file
* @name vuex-heman
* @author Joe Kerr
* @description A collection of Vuex helper methods. You can import individual functions, import sets of functions by category (getters, mutations, actions) or the entire package (vuexHeman). There are two types of helper functions: factories and normal function. Factories take in some setup data and return a function or a set of functions. Normal function can just be assigned. 
* @example
import {crudContainer} from "vuex-heman"; 
import {getters, mutations, actions} from "vuex-heman"; 
import {vuexHeman} from "vuex-heman"; 
*/








const getters = getters_namespaceObject;
const mutations = mutations_namespaceObject;
const actions = actions_namespaceObject;

const crudContainer = crudContainerFactory;

const {getArrayElWIdxByIdFactory: src_getArrayElWIdxByIdFactory} = getters_namespaceObject;
const {setPropVal: src_setPropVal, setProps: src_setProps, setArrayElPropsByIdFactory: src_setArrayElPropsByIdFactory, setPropsOnObjectFactory: src_setPropsOnObjectFactory, addArrayElementFactory: src_addArrayElementFactory, removeArrayElementByIdFactory: src_removeArrayElementByIdFactory, resetArrayFactory: src_resetArrayFactory} = mutations_namespaceObject;
const {passThruActionsFactory: src_passThruActionsFactory} = actions;

const vuexHeman = {
	getters, 
	mutations,
	actions,

	crudContainer
}

/* harmony default export */ var vuex_heman_src = (vuexHeman);





// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/store.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/* harmony default export */ var src_store = ({
  namespaced: true,
  state: {
    dragging: false,
    id: -1,
    type: null,
    callbacks: {}
  },
  getters: {
    dragging: function dragging(state) {
      return state.dragging;
    },
    draggableId: function draggableId(state) {
      return state.dragging ? state.id : null;
    },
    draggableType: function draggableType(state) {
      return state.dragging ? state.type : null;
    }
  },
  mutations: {
    set: mutations.setPropVal,
    addCallback: function addCallback(state, data) {
      var dragType = data.dragType;
      var dropType = data.dropType;
      var act = data.action;

      if (state.callbacks[dragType] === undefined) {
        state.callbacks[dragType] = {};
      }

      state.callbacks[dragType][dropType] = act;
    }
  },
  actions: {
    draggable: function draggable(store, event) {
      store.commit("set", {
        prop: "dragging",
        val: true
      });
      store.commit("set", {
        prop: "type",
        val: event.draggableType
      });

      if (event.draggableData !== null && event.draggableData.id !== undefined) {
        store.commit("set", {
          prop: "id",
          val: event.draggableData.id
        });
      }
    },
    droppable: function droppable(store, event) {
      var callbacks = store.state.callbacks;
      var draggableType = event.draggableType,
          droppableType = event.droppableType;

      if (callbacks[draggableType] !== undefined && callbacks[draggableType][droppableType] !== undefined) {
        return store.dispatch(callbacks[draggableType][droppableType], event, {
          root: true
        });
      }
    },
    done: function done(store) {
      store.commit("set", {
        prop: "dragging",
        val: false
      });
      store.commit("set", {
        prop: "id",
        val: -1
      });
      store.commit("set", {
        prop: "type",
        val: null
      });
    },
    register: function register(store, data) {
      if (typeof data.action === "undefined" || typeof data.dragType === "undefined" || _typeof(data.dropType) === undefined) {
        throw new Error("Missing paratmeter/s: please provide: {action, dragType, dropType}");
      }

      store.commit("addCallback", data);
    }
  }
});
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/index.js





function parseConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = {
    namespace: {
      type: "string",
      default: "drag&drop"
    },
    directive: {
      type: "string",
      default: "drag&drop"
    },
    vuex: {
      type: null
    }
  };
  return cats4Vue.configParser(config, defaults);
}

var installer = {
  install: function install(Vue, config) {
    var vuex = config.vuex;
    var options = parseConfig(config);
    var namespace = options.namespace;
    cats4Vue.registerVuexModule(vuex, namespace, src_store);
    Vue.directive(options.directive, directive(vuex, src_DragAndDrop, {
      namespace: namespace,
      delegateEvents: options.delegateEvents
    }));
  }
};
/* harmony default export */ var dragAndDrop_src = (installer);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport installer */__webpack_require__.d(__webpack_exports__, "installer", function() { return installer; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (dragAndDrop_src);



/***/ })

/******/ });