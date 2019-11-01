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
	_createCopyClone(el) {
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
	
	_createCheapClone(el) {
		const clone = el.cloneNode(false); //low performance grey box
		
		clone.style.border = "1px solid yellow";
		clone.style.boxShadow = "box-shadow: 0px 0px 9px 5px rgba(231,166,26,1)";
		clone.style.backgroundColor = "#eeeeee";
		return clone;
	}	
	
	_createABunchOfClones(els, event, type) {
		const clone = document.createElement("div");
		const initRect = this._getRect(els[0]);
		
		let top = initRect.y;
		let left = initRect.x;
		let bottom = top + initRect.height;
		let right = left + initRect.width;
		
		els.forEach((el)=>{ 
			const rect = this._getRect(el);
			const pos = rect.position;			
			const clonedEl = (type === "copy") ? this._createCopyClone(el) : this._createCheapClone(el);
			
			clonedEl.id = "cloned_"+clonedEl.id;
			clonedEl.$_x = rect.x;
			clonedEl.$_y = rect.y;
			clonedEl.style.position = "absolute";
			if(pos === "fixed") {
				clonedEl.$_x = rect.x + window.pageXOffset;
				clonedEl.$_y = rect.y + window.pageYOffset;				
			}
	
			clone.appendChild(clonedEl);						
			
			if(rect.x < left) { left = rect.x; }
			if(rect.y < top) { top = rect.y; }
			if(rect.x + rect.width > right) { right = rect.x + rect.width; };
			if(rect.y + rect.height > bottom) { bottom = rect.y + rect.height; };
		});
		
		
		return {clone, top, left, bottom, right};
	}
	
	_setupMultiClone(els, event, type) {
		const cloneObj = this._createABunchOfClones(els, event, type);	
		const x = cloneObj.left;
		const y = cloneObj.top;
		const h = cloneObj.bottom - cloneObj.top;
		const w = cloneObj.right - cloneObj.left;		
		const clone = cloneObj.clone;		

		clone.style.position = "absolute";
		
		const children = clone.children;
		for(let i=0, ii=children.length; i<ii; i++) {
			const c = children[i];		
			c.style.left = (c.$_x-x)+"px";
			c.style.top = (c.$_y-y)+"px";	
		}
		
		return {clone, rect: {x, y, width: w, height: h}};
	}

	_setupSingleClone(el, event, type) {
		const originalRect = this._getRect(el);
		const x = originalRect.x;
		const y = originalRect.y;
		const pos = originalRect.position;	
		const clone = (type === "copy") ? this._createCopyClone(el) : this._createCheapClone(el);
		
		if(pos !== "fixed" && pos !== "absolute") {
			clone.style.position = "absolute";
		}
				
		return {clone, rect: originalRect};
	}	
	
	_setupClone(el, event, config, type=null) {
		if(type === null) {return;}	
		
		const list = this._getDraggableList(el, config);
		const cloneObj = (list.length === 1) ? this._setupSingleClone(list[0], event, type) : this._setupMultiClone(list, event, type);	

		clone = cloneObj.clone;
		clone.id = "cloneAnchor";
		clone.style.left = cloneObj.rect.x+"px";
		clone.style.top = cloneObj.rect.y+"px";		
		clone.style.width = cloneObj.rect.width+"px";
		clone.style.height = cloneObj.rect.height+"px";
		clone.style.pointerEvents = "none";		

		const zoom = config.zoom();
		if(zoom !== 1) {
			clone.style.transform = "scale("+zoom+")";
			clone.style["transform-origin"] = (-cloneObj.rect.x)+"px "+(-cloneObj.rect.y)+"px";
			//clone.style["transform-origin"] = "0 0";
		}
		
		event._cloneStartX = cloneObj.rect.x;
		event._cloneStartY = cloneObj.rect.y;		
		
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
	
	_getDraggableList(draggableTarget, config) {
		if(config.draggableType !== null && typeof config.multiDrag === "function") {
			const multi = config.multiDrag();
			if(multi.length > 0) {
				return multi;
			}
		}
		
		return [draggableTarget];
	}
	
	//document.body.contains(dndParams.draggableEl) //should I check for "illegal" removes? As Vue plugin probably not; as D&D class probably yes  #todo
	_evaluateDroppableWatcher(event, config, dndParams, callback) {
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
				callback("mouseup", dndParams);
				
				if(droppable.greedy) {
					break;
				}
			}
		
			if(typeof config.dragstop === "function") {			
				this._writeDroppableParameters(dndParams, event.target, event, config, null);
				config.dragstop("mouseup", dndParams);			
			}
		}
		
		this.droppables.splice(0, this.droppables.length);
		this.processingDroppables = false;
		
		callback("mouseupAlways", dndParams);
		
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
	
	_mousedown(el, event, config, data, callback) {		
		this.isDragging = true;
				
		this._writeDraggableParameters(dragAndDropParameters, el, event, config, data);

		this._initDroppableWatcher(config, dragAndDropParameters, callback);
		
		this._setupClone(el, dragAndDropParameters, config, "copy");

		this._setTempStyle();

		if(typeof config.drag === "function") {
			dragging = function draggingWithCallback(event) {defaultDragging(event); config.drag("mousedown", dragAndDropParameters); };
		}
		else {
			dragging = defaultDragging;
		}
		
		document.addEventListener("mousemove", dragging);	
					
		callback("mousedown", dragAndDropParameters);	
		
		if(typeof config.dragstart === "function") {
			config.dragstart("mousedown", dragAndDropParameters);			
		}		
	}

	addEventListener(elSource, elMoving, config, data, _callback) {
		this._parseConfig(config);
		
		const mode = config.mode;
		const id = this.listeners.length;
		
		if(mode === "draggable") {
			const callback = (config.draggableOnly === false) ? _callback : ()=>{};								
			this.listeners[id] = {
				cb: (event)=>{ this._mousedown(elMoving, event, config, data, callback); },
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