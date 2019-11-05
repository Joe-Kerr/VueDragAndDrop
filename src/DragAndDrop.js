let dragging;

const dragAndDropParameters = {
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

const defaultDragging = function defaultDragging(_event) {
	const dnd = dragAndDropParameters;
	dnd.curX = _event.pageX;
	dnd.curY = _event.pageY;
	
	const deltaX = dnd.curX - dnd.startX;
	const deltaY = dnd.curY - dnd.startY;
	
	dnd.deltaX = deltaX;
	dnd.deltaY = deltaY;
	dnd.draggableNewX = dnd.draggableX + deltaX;
	dnd.draggableNewY = dnd.draggableY + deltaY;
}

class DragAndDrop {	
	constructor() {
		/// draggables
		this.isDragging = false;
		this.draggableGotRemoved = false;
		
		/// droppables
		this.processingDroppables = false;
		this.droppables = [];
		
		///misc
		this.styleBackup = null;
		this.listeners = [];
	}
	
	_getRect(el) {
		let originalRect = el.getBoundingClientRect();
		const elPos = window.getComputedStyle(el).position;

		const x = (elPos !== "fixed") ? originalRect.x+window.pageXOffset : originalRect.x;
		const y = (elPos !== "fixed") ? originalRect.y+window.pageYOffset : originalRect.y;			
		
		return {x, y, width: originalRect.width, height: originalRect.height, position: elPos};
	}
	
	_setTempStyle() {
		this.styleBackup = document.body.style.userSelect;
		document.body.style.userSelect = "none";
	}
	
	_reset() {
		this.isDragging = false;
		this.draggableGotRemoved = false;
		
		for(const p in dragAndDropParameters) {
			dragAndDropParameters[p] = null;
		}	

		document.body.style.userSelect = this.styleBackup;
		document.removeEventListener("mousemove", dragging);
		dragging = null;
		this.styleBackup = null;
	}	

	_evaluateDropOnSelf(self, droppables) {
		for(let i=0, ii=droppables.length; i<ii; i++) {
			if(droppables[i].el === self) {
				return i;
			}
		}
		return -1;
	}
	
	_verifyMode(mode) {
		if(mode !== "draggable" && mode !== "droppable") {
			throw new Error("mode parameter must be 'draggable' or 'droppable'. Got: "+mode);
		}		
	}
	
	_verifyCallbacks(callbacks) {
		if(typeof callbacks !== "object" || typeof callbacks.notify !== "function") {
			throw new Error("callbacks parameter must be an object holding a property 'notify' if type function.");
		}
	}
	
	_parseConfig(config) {
		this._verifyMode(config.mode);

		if(typeof config.greedy !== "boolean") {
			config.greedy = false;
		}	
		
		if(typeof config.draggableOnly !== "boolean") {
			config.draggableOnly = false;
		}		
		
		if(config.type === undefined && (config.greedy === false && config.draggableOnly === false)) {
			throw new Error("Directive requires 'type' value unless modifiers draggable.only OR droppable.greedy are given.");
		}	
				
		const isDraggable = (config.mode === "draggable");		
		config.draggableType = (isDraggable) ? config.type : null;
		config.droppableType = (!isDraggable) ? config.type : null;
	}
	
	_getDraggableList(draggableTarget, config) {
		if(config.draggableType !== null && typeof config.multiDrag === "function") {
			const multi = config.multiDrag();
			if(multi.length > 0) {
				return multi;
			}
		}
		
		return [draggableTarget];
	}
	
	_evaluateDroppableWatcher(event, config, dndParams, callbacks) {
		if(this.draggableGotRemoved === false) {
			const selfIdx = this._evaluateDropOnSelf(dndParams.draggableEl, this.droppables);
			
			for(let i=0, ii=this.droppables.length; i<ii; i++) {
				const droppable = this.droppables[i];					
				const isDropOverSelf = (selfIdx === i);
				
				if(isDropOverSelf) {
					continue;
				}
			
				config.droppableType = droppable.type;
				this._writeDroppableParameters(dndParams, droppable.el, event, config, droppable.data);
				callbacks.notify("droppingOver", dndParams);
				
				if(droppable.greedy) {
					break;
				}
			}
			
			this._writeDroppableParameters(dndParams, event.target, event, config, null);
			callbacks.notify("droppedAll", dndParams);
		}
	
		this.droppables.splice(0, this.droppables.length);
		this.processingDroppables = false;

		callbacks.notify("dragstop", dndParams);
	
		this._reset();
	}

	_initDroppableWatcher(config, dndParams, callbacks) {		
		if(this.processingDroppables) {
			return;
		}	
		
		const _this = this;
		document.addEventListener("mouseup", function inlineCallbackOnce(event2) {
			setTimeout(()=>{ _this._evaluateDroppableWatcher(event2, config, dndParams, callbacks); },1);
			document.removeEventListener("mouseup", inlineCallbackOnce, true);
		}, true);
		
		this.processingDroppables = true;		
	}

	_writeDroppableParameters(params, el, event, config, data) {
		const dom = (el !== document) ? el : el.body;
		const xy = this._getRect(dom);
	
		params.droppableEl = dom;
		params.droppableData = data;
		params.droppableType = config.droppableType;
		params.droppableX = xy.x;
		params.droppableY = xy.y;
		params.endX = event.pageX;
		params.endY = event.pageY;				
	}	
	
	_writeDraggableParameters(params, el, event, config, data) {
		const dom = (el !== document) ? el : el.body;
		const xy = this._getRect(dom);
	
		params.startX = event.pageX;
		params.startY = event.pageY;
		params.curX = event.pageX;
		params.curY = event.pageY;
		params.deltaX = 0;
		params.deltaY = 0;		
		
		params.draggableData = data;
		params.draggableType = config.draggableType;
		params.draggableEl = dom;
		params.draggableX = xy.x;
		params.draggableY = xy.y;
		params.draggableNewX = params.draggableX;
		params.draggableNewY = params.draggableY;

		params.draggableList = this._getDraggableList(el, config);
	}
	
	_mouseup(el, event, config, data) {
		this.droppables.push({el, data, type: config.droppableType, greedy: config.greedy});
	}
	
	_mousedown(el, event, config, data, callbacks) {		
		this.isDragging = true;
				
		this._writeDraggableParameters(dragAndDropParameters, el, event, config, data);

		this._initDroppableWatcher(config, dragAndDropParameters, callbacks);

		this._setTempStyle();

		dragging = function draggingWithCallback(event) {defaultDragging(event); callbacks.notify("dragmove", dragAndDropParameters);}
		
		document.addEventListener("mousemove", dragging);	
		
		callbacks.notify("dragstart", dragAndDropParameters);
	}

	addEventListener(elSource, elMoving, config, data, callbacks) {
		this._parseConfig(config);
		this._verifyCallbacks(callbacks);
		
		const mode = config.mode;
		const id = this.listeners.length;
		
		if(mode === "draggable") {								
			this.listeners[id] = {
				cb: (event)=>{ this._mousedown(elMoving, event, config, data, callbacks); },
				el: elSource
			};
			elSource.addEventListener("mousedown", this.listeners[id].cb);	
		}
		
		else if(mode === "droppable") {	
			this.listeners[id] = {
				cb: (event)=>{ this._mouseup(elMoving, event, config, data); },
				el: elSource
			};
			elSource.addEventListener("mouseup", this.listeners[id].cb);						
		}		
	}
	
	removeEventListener(mode, el) {
		this._verifyMode(mode);
		let success = false;
		const listeners = this.listeners;
		
		if(this.isDragging) {
			this.draggableGotRemoved = true;
		}		
		
		for(let i=0, ii=listeners.length; i<ii; i++) {
			if(listeners[i].el == el) {
				const event = (mode === "draggable") ? "mousedown" : "mouseup";
				el.removeEventListener(event, listeners[i].cb);
				listeners[i].el = null;
				listeners[i].cb = null;
				listeners.splice(i,1);
				success = true;
				break;
			}
		}
		
		if(!success) {
			//console.error({el, mode});
			throw new Error("Failed to remove event listener in unbind hook. This may cause a memory leak.");
		}		
	}
}

export default DragAndDrop;