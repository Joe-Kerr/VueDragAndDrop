import PubSub from "./PubSub.js";
import {createClone, updateClone, destroyClone} from "./cloneController.js";

let notifyStore;

function getMode(arg) {	
	if(arg !== "draggable" && arg !== "droppable") {
		throw new Error("Invalid directive argument. Use v-drag&drop:draggable|droppable. Got: "+arg);
	}
	
	return arg;
}

function getEl(el, value={}) {
	if(value.selector === undefined) {
		return el;
	}
	
	const newEl = document.getElementById(value.selector);
	
	if(newEl === null) {
		throw new Error("Directive option 'selector' ("+value.selector+") did not return a DOM element.");
	}
	return newEl;
}

function getConfig(context, mode, vnode) {
	const params = context.value || {};

	const config = {
		mode,
		type: params.type,
		greedy: (context.modifiers.greedy === true),
		draggableOnly: (context.modifiers.only === true),
		multiDrag: (params.multi !== undefined) ? ()=>vnode.context[params.multi] : null
	};

	return config;
}

function getCallbacks(params, config) {
	const callbacks = new PubSub();
	const events = PubSub.events;
	
	if(!config.draggableOnly) {
		callbacks.subscribe(events.dragstart, storeCallback);
		callbacks.subscribe(events.dragstopOnDroppable, storeCallback);
		callbacks.subscribe(events.dragstopAlways, storeCallback);
	}
	
	callbacks.subscribe(events.dragstart, createClone);
	callbacks.subscribe(events.dragmove, updateClone);
	callbacks.subscribe(events.dragstopAlways, destroyClone);	
	
	if(typeof params.drag === "function") {callbacks.subscribe(events.dragmove, params.drag);}
	if(typeof params.dragstop === "function") {callbacks.subscribe(events.dragstopAfterAllDroppables, params.dragstop);}
	if(typeof params.dragstart === "function") {callbacks.subscribe(events.dragstart, params.dragstart);}
	
	return callbacks;
}

function getData(value={}) {
	return value.data || {};
}

function storeCallback(event, data) {
	const map = {dragstart: "draggable", dragstopOnDroppable: "droppable", dragstopAlways: "done"};
	const command = map[event];
	
	if(command === undefined) {
		throw new Error("Received undefined event in draggable or droppable callback: "+event);
	}	

	notifyStore(command, data);
}

function dragAndDrop(store, DragAndDrop, options={}) {
	const dragAndDrop = new DragAndDrop();
	const namespace = options.namespace;

	notifyStore = (action, data)=>{store.dispatch(namespace+"/"+action, data);}

	//context.arg = v-dir:arg
	//context.value = v-dir="value"
	//context.modifiers = v-dir.mod1.mod2...
	
	return {
		inserted(el, context, vnode) {
			const elHandle = el;
			const mode = getMode(context.arg);	
			const data = getData(context.value);	
			const elMoving = getEl(elHandle, context.value);
			const config = getConfig(context, mode, vnode);			
			const callbacks = getCallbacks(context.value, config);
		
			dragAndDrop.addEventListener(elHandle, elMoving, config, data, callbacks);			
		},
		unbind(el, context, vnode) {
			dragAndDrop.removeEventListener(context.arg, el);
		}
	}
}

export default dragAndDrop;