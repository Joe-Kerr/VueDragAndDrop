let clone = null;
let dragging;

const dragAndDropParameters = {
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

const defaultDragging = function defaultDragging(_event) {
	const dnd = dragAndDropParameters;
	dnd.curX = _event.pageX;
	dnd.curY = _event.pageY;
	
	const deltaX = dnd.curX - dnd.startX;
	const deltaY = dnd.curY - dnd.startY;
	
	dnd.draggableNewX = dnd.draggableX + deltaX;
	dnd.draggableNewY = dnd.draggableY + deltaY;
	
	if(clone === null) {return;}

	clone.style.left = (dnd._cloneStartX+deltaX) +"px";
	clone.style.top = (dnd._cloneStartY+deltaY) +"px";	
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
	
	/// Not really carbon copy since, as it turns out, some more "elaborate" css will not be copied. See e.g. https://stackoverflow.com/questions/1848445/duplicating-an-element-and-its-style-with-javascript
	///  Solutions are not really great. For now, leave it as heuristic carbon copy.
	_createCopyClone(el, event, rect) {
		const clone = el.cloneNode(true);
		const style = document.defaultView.getComputedStyle(el, null);
		
		clone.style.color = style.color;
		clone.style.backgroundColor = style.backgroundColor;
		clone.style.border = style.border;
		clone.style.borderRadius = style.borderRadius;
		
		clone.style.margin = "0px";		
		clone.style.opacity = 0.6;

		return clone;	
	}	
	
	_createCheapClone(el, event, rect) {
		const clone = el.cloneNode(false); //low performance grey box
		
		clone.style.border = "1px solid yellow";
		clone.style.boxShadow = "box-shadow: 0px 0px 9px 5px rgba(231,166,26,1)";
		clone.style.backgroundColor = "#eeeeee";
		return clone;
	}	
	
	_setupClone(el, event, type=null) {
		if(type === null) {return;}	
		
		const originalRect = this._getRect(el);
		const x = originalRect.x;
		const y = originalRect.y;
		const pos = originalRect.position;
	
		clone = (type === "copy") ? this._createCopyClone(el, event, originalRect) : this._createCheapClone(el, event, originalRect);
		clone.id = "cloned_"+clone.id;			
		clone.style.left = x+"px";
		clone.style.top = y+"px";		
		clone.style.width = originalRect.width+"px";
		clone.style.height = originalRect.height+"px";
		clone.style.pointerEvents = "none";
		
		if(pos !== "fixed" && pos !== "absolute") {
			clone.style.position = "absolute";
		}
		
		event._cloneStartX = x;
		event._cloneStartY = y;
	
		document.body.appendChild(clone);
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
		
		if(clone !== null) {
			document.body.removeChild(clone);
			clone = null;	
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
		
		config.delegate = document.getElementById(config.delegate)
				
		const isDraggable = (config.mode === "draggable");		
		config.draggableType = (isDraggable) ? config.type : null;
		config.droppableType = (!isDraggable) ? config.type : null;
	}
	
	//document.body.contains(dndParams.draggableEl) //should I check for "illegal" removes? As Vue plugin probably not; as D&D class probably yes  #todo
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
				callbacks.notify(callbacks.getEvent("dragstopOnDroppable"), dndParams);
				
				if(droppable.greedy) {
					break;
				}
			}
			
			callbacks.notify(callbacks.getEvent("dragstopAfterAllDroppables"), dndParams);
		}
	
		this.droppables.splice(0, this.droppables.length);
		this.processingDroppables = false;

		callbacks.notify(callbacks.getEvent("dragstopAlways"), dndParams);
		
		this._reset();
	}

	_initDroppableWatcher(config, dndParams, callback) {		
		if(this.processingDroppables) {
			return;
		}	
		
		const _this = this;
		document.addEventListener("mouseup", function inlineCallbackOnce(event2) {
			setTimeout(()=>{ _this._evaluateDroppableWatcher(event2, config, dndParams, callback); },1);
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
		
		params.draggableData = data;
		params.draggableType = config.draggableType;
		params.draggableEl = dom;
		params.draggableX = xy.x;
		params.draggableY = xy.y;
		params.draggableNewX = params.draggableX;
		params.draggableNewY = params.draggableY;		
	}
	
	_mouseup(el, event, config, data) {
		this.droppables.push({el, data, type: config.droppableType, greedy: config.greedy});
	}
	
	_mousedown(el, event, config, data, callbacks) {		
		this.isDragging = true;
				
		this._writeDraggableParameters(dragAndDropParameters, el, event, config, data);

		this._initDroppableWatcher(config, dragAndDropParameters, callbacks);

		this._setupClone(el, dragAndDropParameters, "copy");

		this._setTempStyle();

		dragging = function draggingWithCallback(event) {defaultDragging(event); callbacks.notify(callbacks.getEvent("dragmove"), dragAndDropParameters);}
		
		document.addEventListener("mousemove", dragging);	
		
		callbacks.notify(callbacks.getEvent("dragstart"), dragAndDropParameters);
	}

	addEventListener(elSource, elMoving, config, data, callbacks) {
		this._parseConfig(config);
		
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