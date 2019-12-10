import PubSub from "./PubSub.js";
import * as cloneController from "./cloneController.js";

let vuexNotificator = null;

function getMode(mode) {	
	if(mode !== "draggable" && mode !== "droppable") {
		throw new Error("Invalid directive mode. Use v-drag&drop:draggable|droppable. Got: "+mode);
	}
	return mode;
}

function getEl(selector) {
	const newEl = document.getElementById(selector);
	
	if(newEl === null) {
		throw new Error("Directive option 'selector' ("+selector+") did not return a DOM element.");
	}
	return newEl;
}

//https://stackoverflow.com/a/384380/5250495
function verifyDOMEl(o){
	if( typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string") {
		 return;
	}
	throw new Error("The element provided is not an HTML element.");
}

function storeCallback(event, data) {
	const map = {dragstart: "draggable", droppingOver: "droppable", dragstop: "done"};
	const command = map[event];
	
	if(command === undefined) {
		throw new Error("Received undefined event in draggable or droppable store callback: "+event);
	}	

	vuexNotificator(command, data);
}

function setupCallbacks(config, userCallbacks) {
	const callbacks = new PubSub();

	if(!config.draggableOnly) {
		callbacks.subscribe("dragstart", storeCallback);
		callbacks.subscribe("droppingOver", storeCallback);
		callbacks.subscribe("dragstop", storeCallback);
	}
	
	if(config.cloneType !== null) {
		callbacks.subscribe("dragstart", function createCloneAdapter(event, data) {
			cloneController.createClone(data.draggableList, {type: config.cloneType, willChange: config.cloneWillChangeThreshold});
		});
		
		callbacks.subscribe("dragmove", function createCloneAdapter(event, data) {
			cloneController.updateClone(data);
		});
		
		callbacks.subscribe("dragstop", cloneController.destroyClone);	
	}
	
	if(typeof userCallbacks.drag === "function") {console.error("DEPRECATED: use 'dragmove' instead of 'drag' as a drag and drop config property."); callbacks.subscribe("dragmove", userCallbacks.drag);}
	if(typeof userCallbacks.dragmove === "function") {callbacks.subscribe("dragmove", userCallbacks.dragmove);}
	if(typeof userCallbacks.dragstop === "function") {callbacks.subscribe("droppedAll", userCallbacks.dragstop);}
	if(typeof userCallbacks.dragstart === "function") {callbacks.subscribe("dragstart", userCallbacks.dragstart);}
	
	return callbacks;	
}

function preprocessConfig(options={}, vnode) {
	if(vuexNotificator === null) {
		throw new Error("Tried to init a drag or drop operation but the plugin has not been installed yet.");
	}
	
	const config = {
		mode: getMode(options.mode),

		greedy: (options.greedy === true),
		draggableOnly: (options.only === true),
		
		type: options.type,
		elMoving: (options.selector === undefined) ? null : getEl(options.selector),
		data: options.data || {},	
		multiDrag: (options.multi !== undefined) ? ()=>vnode[options.multi] : null,	
		cloneType: (options.cloneType !== undefined) ? options.cloneType: "copy",
		cloneWillChangeThreshold: (options.cloneType !== undefined) ? options.cloneWillChangeThreshold : 0			
	};

	return config;
}


export function preprocessMixinConfig(el, options, vnode) {
	verifyDOMEl(el);
	
	const config = preprocessConfig(options, vnode);
	config.callbacks = setupCallbacks(config, options);

	return config;
}

export function preprocessDirectiveConfig(el, mergedDirectiveOptions, vnode) {
	const config = preprocessConfig(mergedDirectiveOptions, vnode.context);
	config.callbacks = setupCallbacks(config, mergedDirectiveOptions);
	if(config.elMoving === null) {config.elMoving = el;}
	
	return config;
}

export function registerVuexInstance(vuex, namespace, reset=false) {
	if(reset === true) {
		vuexNotificator = null;
		return;
	}
	
	vuexNotificator = (action, data)=>{vuex.dispatch(namespace+"/"+action, data);};
}