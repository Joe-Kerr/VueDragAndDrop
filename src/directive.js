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
		
		multiDrag: (params.multi !== undefined) ? ()=>vnode.context[params.multi] : null,	
		cloneType: (params.cloneType !== undefined) ? params.cloneType: "copy",
		cloneWillChangeThreshold: (params.cloneType !== undefined) ? params.cloneWillChangeThreshold : 0
	};

	return config;
}

function getCallbacks(params={}, config, subsystems) {
	const callbacks = new subsystems.PubSub();
	const cloneController = subsystems.cloneController;
	
	if(!config.draggableOnly) {
		callbacks.subscribe("dragstart", storeCallback);
		callbacks.subscribe("droppingOver", storeCallback);
		callbacks.subscribe("dragstop", storeCallback);
	}
	
	callbacks.subscribe("dragstart", function createCloneAdapter(event, data) {
		cloneController.createClone(data.draggableList, {type: config.cloneType, willChange: config.cloneWillChangeThreshold});
	});
	
	callbacks.subscribe("dragmove", function createCloneAdapter(event, data) {
		cloneController.updateClone(data);
	});
	
	callbacks.subscribe("dragstop", cloneController.destroyClone);	
	
	if(typeof params.drag === "function") {callbacks.subscribe("dragmove", params.drag);}
	if(typeof params.dragstop === "function") {callbacks.subscribe("droppedAll", params.dragstop);}
	if(typeof params.dragstart === "function") {callbacks.subscribe("dragstart", params.dragstart);}
	
	return callbacks;
}

function getData(value={}) {
	return value.data || {};
}

function storeCallback(event, data) {
	const map = {dragstart: "draggable", droppingOver: "droppable", dragstop: "done"};
	const command = map[event];
	
	if(command === undefined) {
		throw new Error("Received undefined event in draggable or droppable callback: "+event);
	}	

	notifyStore(command, data);
}

function dragAndDrop(store, subsystems, options={}) {
	const dragAndDrop = new subsystems.DragAndDrop();
	const namespace = options.namespace;
	
	notifyStore = (action, data)=>{store.dispatch(namespace+"/"+action, data);}

	//context.arg = v-dir:arg
	//context.value = v-dir="value"
	//context.modifiers = v-dir.mod1.mod2...
	
	return {
		inserted(el, context, vnode) {
			const mode = getMode(context.arg);	
			const data = getData(context.value);	
			const elMoving = getEl(el, context.value);
			const config = getConfig(context, mode, vnode);			
			const callbacks = getCallbacks(context.value, config, subsystems);
		
			dragAndDrop.addEventListener(el, elMoving, config, data, callbacks);			
		},
		
		unbind(el, context, vnode) {
			dragAndDrop.removeEventListener(context.arg, el);
		}
	}
}

export default dragAndDrop;