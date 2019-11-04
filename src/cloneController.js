let clone = null;
let cloneStartX = null;
let cloneStartY = null;

// https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth = innerWidth+padding; 0 for inline/css-less
// boundingRect = innerWidth + padding + margin + border + scrollBar
function getRect(el) {
	let originalRect = el.getBoundingClientRect();
	const cstyles = window.getComputedStyle(el);
	const elPos = cstyles.position;

	const x = (elPos !== "fixed") ? originalRect.x+window.pageXOffset : originalRect.x;
	const y = (elPos !== "fixed") ? originalRect.y+window.pageYOffset : originalRect.y;			
	
	const innerWidth = parseInt(cstyles.width.replace("px", ""));
	const innerHeight = parseInt(cstyles.height.replace("px", ""));
	
	return {x, y, width: originalRect.width, height: originalRect.height, position: elPos, innerWidth, innerHeight};
}

/// Not really carbon copy since, as it turns out, some more "elaborate" css will not be copied. See e.g. https://stackoverflow.com/questions/1848445/duplicating-an-element-and-its-style-with-javascript
///  Solutions are not really great. For now, leave it as heuristic carbon copy.
function createCopyClone(el) {
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

function createCheapClone(el) {
	const clone = el.cloneNode(false); //"low" performance grey box
	
	clone.style.border = "1px solid yellow";
	clone.style.boxShadow = "box-shadow: 0px 0px 9px 5px rgba(231,166,26,1)";
	clone.style.backgroundColor = "#eeeeee";
	return clone;
}	

function createABunchOfClones(els, type) {
	const clone = document.createElement("div");
	const initRect = getRect(els[0]);
	
	let top = initRect.y;
	let left = initRect.x;
	let bottom = top + initRect.height;
	let right = left + initRect.width;
	
	els.forEach((el)=>{ 
		const rect = getRect(el);
		const pos = rect.position;			
		const clonedEl = (type === "copy") ? createCopyClone(el) : createCheapClone(el);
		
		clonedEl.id = "cloned_"+clonedEl.id;
		clonedEl.$_x = rect.x;
		clonedEl.$_y = rect.y;
		clonedEl.style.position = "absolute";
		clonedEl.style.width = rect.innerWidth+"px";
		clonedEl.style.height = rect.innerHeight+"px";		
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

function setupMultiClone(els, type) {
	const cloneObj = createABunchOfClones(els, type);	
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

function setupSingleClone(el, type) {
	const originalRect = getRect(el);
	const x = originalRect.x;
	const y = originalRect.y;
	const pos = originalRect.position;	
	const clone = (type === "copy") ? createCopyClone(el) : createCheapClone(el);
	
	if(pos !== "fixed" && pos !== "absolute") {
		clone.style.position = "absolute";
	}
	
	clone.style.width = originalRect.innerWidth+"px";
	clone.style.height = originalRect.innerHeight+"px";
			
	return {clone, rect: originalRect};
}	

function setupClone(draggables, config) {		
	if(config.type === null) {return;}	

	const list = draggables;
	const cloneObj = (list.length === 1) ? setupSingleClone(list[0], config.type) : setupMultiClone(list, config.type);	

	clone = cloneObj.clone;
	clone.id = "cloneAnchor";
	clone.style.left = cloneObj.rect.x+"px";
	clone.style.top = cloneObj.rect.y+"px";		
	//clone.style.width = cloneObj.rect.width+"px";
	//clone.style.height = cloneObj.rect.height+"px";
	clone.style.pointerEvents = "none";		
	
	if(config.willChange > 0 && list.length >= config.willChange) {
		clone.style["will-change"] = "transform";
	}
	
	cloneStartX = cloneObj.rect.x;
	cloneStartY = cloneObj.rect.y;		
	
	document.body.appendChild(clone);
}

export function destroyClone() {
	if(clone !== null) {
		document.body.removeChild(clone);
		clone = null;
		cloneStartX = null;
		cloneStartY = null;
	}	
}

export function updateClone(data) {
	if(clone === null) {return;}

	const deltaX = data.curX - data.startX;
	const deltaY = data.curY - data.startY;

	clone.style.transform = "translate("+deltaX+"px, "+deltaY+"px)";
	clone.style.transition = "0s";
}

export function createClone(draggables, config) {
	setupClone(draggables, config);
}