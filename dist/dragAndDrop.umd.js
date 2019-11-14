(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dragAndDrop"] = factory();
	else
		root["dragAndDrop"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
function mergeDirectiveOptions(arg) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var mods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  //context.arg = v-dir:arg
  //context.value = v-dir="value"
  //context.modifiers = v-dir.mod1.mod2...
  var options = Object.assign({}, value, mods);
  options.mode = arg;
  return options;
}

function dragAndDrop(store, subsystems) {
  var dragAndDrop = subsystems.dragAndDropInstance;
  return {
    inserted: function inserted(el, context, vnode) {
      var config = subsystems.preprocessDirectiveConfig(el, mergeDirectiveOptions(context.arg, context.value, context.modifiers), vnode);
      dragAndDrop.addEventListener(el, config.elMoving, config, config.data, config.callbacks);
    },
    unbind: function unbind(el, context, vnode) {
      dragAndDrop.removeEventListener(context.arg, el);
    }
  };
}

/* harmony default export */ var directive = (dragAndDrop);
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/helpers.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rectId = null;
var rectCache = null;

function pxToInt(px) {
  if (px === "") {
    return 0;
  }

  var intVal = parseInt(px.replace("px", ""));

  if (isNaN(intVal)) {
    throw new Error("Failed to parse pixel value");
  }

  return intVal;
} //* General: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
//			 https://docs.microsoft.com/en-us/previous-versions//hh781509(v=vs.85)
//*box-sizing https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
// "content-box": outer width = inner width + padding + border
// "border-box": outer width = (inner width - padding - border) + padding + border
//*style.width 
// "inner width"
//*clientWdith (https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
// inner width + padding | 0 for inline/css-less
//*offsetWdith (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
// inner width + padding + border + scrollBar | 0 if hidden
//*boundingRect
// innerWidth + padding + margin + border + scrollBar


function getRectAbs(el) {
  var _rectData;

  if (rectId === el) {
    return rectCache;
  }

  var rectData = (_rectData = {
    position: "",
    //layout box
    outerX: 0,
    outerY: 0,
    outerWidth: 0,
    outerHeight: 0,
    //equiv to css vals
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    //absolute page (absolute) or viewport (fixed) position minus marginLeft/Top
    absX: 0,
    absY: 0
  }, _defineProperty(_rectData, "outerWidth", 0), _defineProperty(_rectData, "outerHeight", 0), _defineProperty(_rectData, "offsetX", 0), _defineProperty(_rectData, "offsetY", 0), _defineProperty(_rectData, "width", 0), _defineProperty(_rectData, "height", 0), _rectData);
  var rect = el.getBoundingClientRect();
  var cstyles = window.getComputedStyle(el);
  var elPos = cstyles.position;
  var borderH = pxToInt(cstyles.borderLeftWidth) + pxToInt(cstyles.borderRightWidth);
  var borderV = pxToInt(cstyles.borderTopWidth) + pxToInt(cstyles.borderBottomWidth);
  var paddingH = pxToInt(cstyles.paddingLeft) + pxToInt(cstyles.paddingRight);
  var paddingV = pxToInt(cstyles.paddingTop) + pxToInt(cstyles.paddingBottom);
  var marginLeft = pxToInt(cstyles.marginLeft);
  var marginTop = pxToInt(cstyles.marginTop);
  rectData.position = elPos;
  rectData.outerX = elPos !== "fixed" ? rect.x + window.pageXOffset : rect.x;
  rectData.outerY = elPos !== "fixed" ? rect.y + window.pageYOffset : rect.y;
  rectData.left = rectData.outerX - marginLeft;
  rectData.top = rectData.outerY - marginTop;
  rectData.outerWidth = rect.width;
  rectData.outerHeight = rect.height;
  rectData.width = rectData.outerWidth - borderH - paddingH;
  ;
  rectData.height = rectData.outerHeight - borderV - paddingV; //

  rectData.absX = (elPos !== "fixed" ? rect.x + window.pageXOffset : rect.x) - marginLeft;
  rectData.absY = (elPos !== "fixed" ? rect.y + window.pageYOffset : rect.y) - marginTop;
  rectData.offsetX = el.offsetLeft;
  rectData.offsetY = el.offsetTop;
  rectData.outerWidth = rect.width;
  rectData.outerHeight = rect.height;
  rectData.width = rectData.outerWidth - borderH - paddingH;
  ;
  rectData.height = rectData.outerHeight - borderV - paddingV; //

  rectId = el;
  rectCache = rectData;
  return rectData;
}
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/DragAndDrop.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var dragging;
var dragAndDropParameters = {
  startX: null,
  startY: null,
  endX: null,
  endY: null,
  curX: null,
  curY: null,
  deltaX: null,
  deltaY: null,
  draggableEl: null,
  draggableX: null,
  draggableY: null,
  draggableNewX: null,
  draggableNewY: null,
  draggableType: null,
  draggableData: null,
  draggableList: null,
  droppableEl: null,
  droppableX: null,
  droppableY: null,
  droppableType: null,
  droppableData: null
};

var defaultDragging = function defaultDragging(_event) {
  var dnd = dragAndDropParameters;
  dnd.curX = _event.pageX;
  dnd.curY = _event.pageY;
  var deltaX = dnd.curX - dnd.startX;
  var deltaY = dnd.curY - dnd.startY;
  dnd.deltaX = deltaX;
  dnd.deltaY = deltaY;
  dnd.draggableNewX = dnd.draggableX + deltaX;
  dnd.draggableNewY = dnd.draggableY + deltaY;
};

var DragAndDrop_DragAndDrop =
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
      return getRectAbs(el);
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
    key: "_verifyCallbacks",
    value: function _verifyCallbacks(callbacks) {
      if (_typeof(callbacks) !== "object" || typeof callbacks.notify !== "function") {
        throw new Error("callbacks parameter must be an object holding a property 'notify' if type function.");
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
        throw new Error("Drag or drop requires 'type' value unless modifiers draggable.only OR droppable.greedy are given.");
      }

      var isDraggable = config.mode === "draggable";
      config.draggableType = isDraggable ? config.type : null;
      config.droppableType = !isDraggable ? config.type : null;
    }
  }, {
    key: "_getDraggableList",
    value: function _getDraggableList(draggableTarget, config) {
      if (config.draggableType !== null && typeof config.multiDrag === "function") {
        var multi = config.multiDrag();

        if (multi.length > 0) {
          return multi;
        }
      }

      return [draggableTarget];
    }
  }, {
    key: "_evaluateDroppableWatcher",
    value: function _evaluateDroppableWatcher(event, config, dndParams, callbacks) {
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

          callbacks.notify("droppingOver", dndParams);

          if (droppable.greedy) {
            break;
          }
        }

        this._writeDroppableParameters(dndParams, event.target, event, config, null);

        callbacks.notify("droppedAll", dndParams);
      }

      this.droppables.splice(0, this.droppables.length);
      this.processingDroppables = false;
      config.droppableType = null;

      this._writeDroppableParameters(dndParams, event.target, event, config, null);

      callbacks.notify("dragstop", dndParams);

      this._reset();
    }
  }, {
    key: "_initDroppableWatcher",
    value: function _initDroppableWatcher(config, dndParams, callbacks) {
      if (this.processingDroppables) {
        return;
      }

      var _this = this;

      document.addEventListener("mouseup", function inlineCallbackOnce(event2) {
        setTimeout(function () {
          _this._evaluateDroppableWatcher(event2, config, dndParams, callbacks);
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
      params.droppableX = xy.offsetX;
      params.droppableY = xy.offsetY;
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
      params.deltaX = 0;
      params.deltaY = 0;
      params.draggableData = data;
      params.draggableType = config.draggableType;
      params.draggableEl = dom;
      params.draggableX = xy.offsetX;
      params.draggableY = xy.offsetY;
      params.draggableNewX = params.draggableX;
      params.draggableNewY = params.draggableY;
      params.draggableList = this._getDraggableList(el, config);
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
    value: function _mousedown(el, event, config, data, callbacks) {
      this.isDragging = true;

      this._writeDraggableParameters(dragAndDropParameters, el, event, config, data);

      this._initDroppableWatcher(config, dragAndDropParameters, callbacks);

      this._setTempStyle();

      dragging = function draggingWithCallback(event) {
        defaultDragging(event);
        callbacks.notify("dragmove", dragAndDropParameters);
      };

      document.addEventListener("mousemove", dragging);
      callbacks.notify("dragstart", dragAndDropParameters);
    }
  }, {
    key: "hotDND",
    value: function hotDND(el, config, data, event, callbacks) {
      this._parseConfig(config);

      var mode = config.mode;

      if (mode === "draggable") {
        if (this.isDragging === true) {
          throw new Error("Tried to init another direct drag operation while one is aleady running.");
        }

        this._verifyCallbacks(callbacks);

        this._mousedown(el, event, config, data, callbacks);
      } else if (mode === "droppable") {
        if (this.isDragging === false) {
          throw new Error("Tried to init a direct drop operation but a drag operation did not precede.");
        }

        this._mouseup(el, event, config, data);
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(elSource, elMoving, config, data, callbacks) {
      var _this2 = this;

      this._parseConfig(config);

      this._verifyCallbacks(callbacks);

      var mode = config.mode;
      var id = this.listeners.length;

      if (mode === "draggable") {
        this.listeners[id] = {
          cb: function cb(event) {
            _this2._mousedown(elMoving, event, config, data, callbacks);
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

/* harmony default export */ var src_DragAndDrop = (DragAndDrop_DragAndDrop);
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/PubSub.js
function PubSub_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PubSub_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PubSub_createClass(Constructor, protoProps, staticProps) { if (protoProps) PubSub_defineProperties(Constructor.prototype, protoProps); if (staticProps) PubSub_defineProperties(Constructor, staticProps); return Constructor; }

var PubSub =
/*#__PURE__*/
function () {
  function PubSub() {
    PubSub_classCallCheck(this, PubSub);

    var events = PubSub.events;

    for (var event in events) {
      this[events[event]] = [];
    }
  }

  PubSub_createClass(PubSub, [{
    key: "subscribe",
    value: function subscribe(event, callback) {
      var subs = this[event];

      if (subs === undefined) {
        throw new Error("Tried to subscribe to undefined event: " + event);
      }

      subs.push(callback);
    }
  }, {
    key: "notify",
    value: function notify(event, data) {
      var subs = this[event];

      if (subs === undefined) {
        throw new Error("Tried to notify undefined event: " + event);
      }

      for (var i = 0, ii = subs.length; i < ii; i++) {
        subs[i](event, data);
      }
    }
  }, {
    key: "getEvent",
    value: function getEvent(name) {
      var event = PubSub.events[name];

      if (event === undefined) {
        throw new Error("Event not found with key: " + name);
      }

      return event;
    }
  }]);

  return PubSub;
}();

PubSub.events = {
  "dragstart": "dragstart",
  "dragmove": "dragmove",
  "dragstopOnDroppable": "droppingOver",
  "dragstopAfterAllDroppables": "droppedAll",
  "dragstopAlways": "dragstop"
};
/* harmony default export */ var src_PubSub = (PubSub);
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/cloneController.js

var clone = null;
var cloneStartX = null;
var cloneStartY = null;

function getRect(el) {
  return getRectAbs(el);
} // Not really carbon copy, see e.g. https://stackoverflow.com/questions/1848445/duplicating-an-element-and-its-style-with-javascript


function createCopyClone(el) {
  var clone = el.cloneNode(true);
  var style = document.defaultView.getComputedStyle(el, null);
  var directions = ["Top", "Left", "Bottom", "Right"];
  var borderProps = ["Color", "Style", "Width"];
  clone.style.color = style.color;
  clone.style.backgroundColor = style.backgroundColor;

  for (var i = 0, ii = directions.length; i < ii; i++) {
    for (var j = 0, jj = borderProps.length; j < jj; j++) {
      var key = "border" + directions[i] + borderProps[j];
      clone.style[key] = style[key];
    }
  }

  clone.style.borderRadius = style.borderRadius;
  clone.style.marginTop = style.marginTop;
  clone.style.marginRight = style.marginLeft;
  clone.style.marginLeft = style.marginLeft;
  clone.style.marginBottom = style.marginBottom;
  clone.style.paddingTop = style.paddingTop;
  clone.style.paddingRight = style.paddingLeft;
  clone.style.paddingLeft = style.paddingLeft;
  clone.style.paddingBottom = style.paddingBottom;
  clone.style.overflow = style.overflow;
  clone.style.boxSizing = style.boxSizing;
  clone.style.opacity = 0.6;
  return clone;
}

function createCheapClone(el) {
  var clone = el.cloneNode(false); //"low" performance grey box

  clone.style.border = "1px solid yellow";
  clone.style.boxShadow = "box-shadow: 0px 0px 9px 5px rgba(231,166,26,1)";
  clone.style.backgroundColor = "#eeeeee";
  return clone;
}

function createABunchOfClones(els, type) {
  var clone = document.createElement("div");
  var initRect = getRect(els[0]);
  var postProcRects = [];
  var top = initRect.absY;
  var left = initRect.absX;
  var bottom = top + initRect.outerHeight;
  var right = left + initRect.outerWidth;
  els.forEach(function (el) {
    var rect = getRect(el);

    if (rect.absX < left) {
      left = rect.absX;
    }

    if (rect.absY < top) {
      top = rect.absY;
    }

    if (rect.absX + rect.outerWidth > right) {
      right = rect.absX + rect.outerWidth;
    }

    ;

    if (rect.absY + rect.outerHeight > bottom) {
      bottom = rect.absY + rect.outerHeight;
    }

    ;
    postProcRects.push(rect);
  });
  els.forEach(function (el, i) {
    var rect = postProcRects[i];
    var pos = rect.position;
    var clonedEl = type === "copy" ? createCopyClone(el) : createCheapClone(el); //el [+ fixedToAbsolute] - relativeToParent

    var x = rect.absX + (pos === "fixed" ? window.pageXOffset : 0) - left;
    var y = rect.absY + (pos === "fixed" ? window.pageYOffset : 0) - top;
    clonedEl.id = "cloned_" + clonedEl.id;
    clonedEl.style.position = "absolute";
    clonedEl.style.left = x + "px";
    clonedEl.style.top = y + "px";
    clonedEl.style.width = rect.width + "px";
    clonedEl.style.height = rect.height + "px";
    clone.appendChild(clonedEl);
  });
  return {
    clone: clone,
    top: top,
    left: left,
    bottom: bottom,
    right: right
  };
}

function setupMultiClone(els, type) {
  var cloneObj = createABunchOfClones(els, type);
  var x = cloneObj.left;
  var y = cloneObj.top;
  var h = cloneObj.bottom - cloneObj.top;
  var w = cloneObj.right - cloneObj.left;
  var clone = cloneObj.clone;
  clone.style.position = "absolute";
  return {
    clone: clone,
    rect: {
      x: x,
      y: y
    }
  };
}

function setupSingleClone(el, type) {
  var originalRect = getRect(el);
  var x = originalRect.absX;
  var y = originalRect.absY;
  var pos = originalRect.position;
  var clone = type === "copy" ? createCopyClone(el) : createCheapClone(el);

  if (pos !== "fixed" && pos !== "absolute") {
    clone.style.position = "absolute";
  } else {
    clone.style.position = pos;
  }

  clone.style.width = originalRect.width + "px";
  clone.style.height = originalRect.height + "px";
  return {
    clone: clone,
    rect: {
      x: x,
      y: y
    }
  };
}

function setupClone(draggables, config) {
  if (config.type === null) {
    return;
  }

  var cloneObj = draggables.length === 1 ? setupSingleClone(draggables[0], config.type) : setupMultiClone(draggables, config.type);
  var x = cloneObj.rect.x;
  var y = cloneObj.rect.y;
  clone = cloneObj.clone;
  clone.id = "cloneAnchor";
  clone.style.left = x + "px";
  clone.style.top = y + "px";
  clone.style.pointerEvents = "none";
  clone.style.transition = "0s";

  if (config.willChange > 0 && draggables.length >= config.willChange) {
    clone.style["will-change"] = "transform";
  }

  cloneStartX = x;
  cloneStartY = y;
  document.body.appendChild(clone);
}

function destroyClone() {
  //return
  if (clone === null) {
    return;
  }

  document.body.removeChild(clone);
  clone = null;
  cloneStartX = null;
  cloneStartY = null;
}
function updateClone(data) {
  if (clone === null) {
    return;
  }

  clone.style.transform = "translate(" + data.deltaX + "px, " + data.deltaY + "px)";
}
function createClone(draggables, config) {
  setupClone(draggables, config);
}
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/configPreprocessor.js
function configPreprocessor_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { configPreprocessor_typeof = function _typeof(obj) { return typeof obj; }; } else { configPreprocessor_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return configPreprocessor_typeof(obj); }



var vuexNotificator = null;

function getMode(mode) {
  if (mode !== "draggable" && mode !== "droppable") {
    throw new Error("Invalid directive mode. Use v-drag&drop:draggable|droppable. Got: " + mode);
  }

  return mode;
}

function getEl(selector) {
  var newEl = document.getElementById(selector);

  if (newEl === null) {
    throw new Error("Directive option 'selector' (" + selector + ") did not return a DOM element.");
  }

  return newEl;
} //https://stackoverflow.com/a/384380/5250495


function verifyDOMEl(o) {
  if ((typeof HTMLElement === "undefined" ? "undefined" : configPreprocessor_typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
  o && configPreprocessor_typeof(o) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string") {
    return;
  }

  throw new Error("The element provided is not an HTML element.");
}

function storeCallback(event, data) {
  var map = {
    dragstart: "draggable",
    droppingOver: "droppable",
    dragstop: "done"
  };
  var command = map[event];

  if (command === undefined) {
    throw new Error("Received undefined event in draggable or droppable store callback: " + event);
  }

  vuexNotificator(command, data);
}

function setupCallbacks(config, userCallbacks) {
  var callbacks = new src_PubSub();

  if (!config.draggableOnly) {
    callbacks.subscribe("dragstart", storeCallback);
    callbacks.subscribe("droppingOver", storeCallback);
    callbacks.subscribe("dragstop", storeCallback);
  }

  if (config.cloneType !== null) {
    callbacks.subscribe("dragstart", function createCloneAdapter(event, data) {
      createClone(data.draggableList, {
        type: config.cloneType,
        willChange: config.cloneWillChangeThreshold
      });
    });
    callbacks.subscribe("dragmove", function createCloneAdapter(event, data) {
      updateClone(data);
    });
    callbacks.subscribe("dragstop", destroyClone);
  }

  if (typeof userCallbacks.drag === "function") {
    console.error("DEPRECATED: use 'dragmove' instead of 'drag' as a drag and drop config property.");
    callbacks.subscribe("dragmove", userCallbacks.drag);
  }

  if (typeof userCallbacks.dragmove === "function") {
    callbacks.subscribe("dragmove", userCallbacks.dragmove);
  }

  if (typeof userCallbacks.dragstop === "function") {
    callbacks.subscribe("droppedAll", userCallbacks.dragstop);
  }

  if (typeof userCallbacks.dragstart === "function") {
    callbacks.subscribe("dragstart", userCallbacks.dragstart);
  }

  return callbacks;
}

function preprocessConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var vnode = arguments.length > 1 ? arguments[1] : undefined;

  if (vuexNotificator === null) {
    throw new Error("Tried to init a drag or drop operation but the plugin has not been installed yet.");
  }

  var config = {
    mode: getMode(options.mode),
    greedy: options.greedy === true,
    draggableOnly: options.only === true,
    type: options.type,
    elMoving: options.selector === undefined ? null : getEl(options.selector),
    data: options.data || {},
    multiDrag: options.multi !== undefined ? function () {
      return vnode.context[options.multi];
    } : null,
    cloneType: options.cloneType !== undefined ? options.cloneType : "copy",
    cloneWillChangeThreshold: options.cloneType !== undefined ? options.cloneWillChangeThreshold : 0
  };
  return config;
}

function preprocessMixinConfig(el, options, vnode) {
  verifyDOMEl(el);
  var config = preprocessConfig(options, vnode);
  config.callbacks = setupCallbacks(config, options);
  return config;
}
function preprocessDirectiveConfig(el, mergedDirectiveOptions, vnode) {
  var config = preprocessConfig(mergedDirectiveOptions, vnode);
  config.callbacks = setupCallbacks(config, mergedDirectiveOptions);

  if (config.elMoving === null) {
    config.elMoving = el;
  }

  return config;
}
function registerVuexInstance(vuex, namespace) {
  var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (reset === true) {
    vuexNotificator = null;
    return;
  }

  vuexNotificator = function vuexNotificator(action, data) {
    vuex.dispatch(namespace + "/" + action, data);
  };
}
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
function store_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { store_typeof = function _typeof(obj) { return typeof obj; }; } else { store_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return store_typeof(obj); }


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
      if (typeof data.action === "undefined" || typeof data.dragType === "undefined" || store_typeof(data.dropType) === undefined) {
        throw new Error("Missing paratmeter/s: please provide: {action, dragType, dropType}");
      }

      store.commit("addCallback", data);
    }
  }
});
// CONCATENATED MODULE: ./projects/plugins/dragAndDrop/src/index.js





var dragAndDropInstance = new src_DragAndDrop();

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

var hotDNDMixin = {
  methods: {
    hotDND: function hotDND(el, options, event) {
      var config = preprocessMixinConfig(el, options, this);
      dragAndDropInstance.hotDND(el, config, config.data, event, config.callbacks);
    }
  }
};
var installer = {
  install: function install(Vue, config) {
    var options = parseConfig(config);
    var namespace = options.namespace;
    var vuex = config.vuex;
    cats4Vue.registerVuexModule(vuex, namespace, src_store);
    registerVuexInstance(vuex, namespace);
    var subsystems = {
      dragAndDropInstance: dragAndDropInstance,
      preprocessDirectiveConfig: preprocessDirectiveConfig
    };
    Vue.directive(options.directive, directive(vuex, subsystems));
  }
};
/* harmony default export */ var dragAndDrop_src = (installer);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport hotDNDMixin */__webpack_require__.d(__webpack_exports__, "hotDNDMixin", function() { return hotDNDMixin; });
/* concated harmony reexport installer */__webpack_require__.d(__webpack_exports__, "installer", function() { return installer; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (dragAndDrop_src);



/***/ })

/******/ });
});