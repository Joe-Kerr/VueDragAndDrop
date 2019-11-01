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
		drag: params.drag,
		dragstop: params.dragstop,
		dragstart: params.dragstart,
		multiDrag: (params.multi !== undefined) ? ()=>vnode.context[params.multi] : null
	};

	return config;
}

function getData(value={}) {
	return value.data || {};
}

function storeCallback(event, data) {
	const map = {mousedown: "draggable", mouseup: "droppable", mouseupAlways: "done"};
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

			dragAndDrop.addEventListener(elHandle, elMoving, config, data, storeCallback);			
		},
		unbind(el, context, vnode) {
			dragAndDrop.removeEventListener(context.arg, el);
		}
	}
}

export default dragAndDrop;