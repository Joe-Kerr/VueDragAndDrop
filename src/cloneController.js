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

// Not really carbon copy, see e.g. https://stackoverflow.com/questions/1848445/duplicating-an-element-and-its-style-with-javascript
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
	const postProcRects = [];
	
	let top = initRect.y;
	let left = initRect.x;
	let bottom = top + initRect.height;
	let right = left + initRect.width;
	
	els.forEach((el)=>{ 
		const rect = getRect(el);
		if(rect.x < left) { left = rect.x; }
		if(rect.y < top) { top = rect.y; }
		if(rect.x + rect.width > right) { right = rect.x + rect.width; };
		if(rect.y + rect.height > bottom) { bottom = rect.y + rect.height; };
		postProcRects.push(rect);			
	});
	
	els.forEach((el, i)=>{
		const rect = postProcRects[i];
		const pos = rect.position;			
		const clonedEl = (type === "copy") ? createCopyClone(el) : createCheapClone(el);		
		const x = rect.x + ( (pos === "fixed") ? window.pageXOffset : 0 ) - left;
		const y = rect.y + ( (pos === "fixed") ? window.pageYOffset : 0 ) - top;
		
		clonedEl.id = "cloned_"+clonedEl.id;
		clonedEl.style.position = "absolute";
		clonedEl.style.left = x+"px";
		clonedEl.style.top = y+"px";			
		clonedEl.style.width = rect.innerWidth+"px";
		clonedEl.style.height = rect.innerHeight+"px";		

		clone.appendChild(clonedEl);						
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

	const cloneObj = (draggables.length === 1) ? setupSingleClone(draggables[0], config.type) : setupMultiClone(draggables, config.type);	

	clone = cloneObj.clone;
	clone.id = "cloneAnchor";
	clone.style.left = cloneObj.rect.x+"px";
	clone.style.top = cloneObj.rect.y+"px";		
	clone.style.pointerEvents = "none";	
	clone.style.transition = "0s";
	
	if(config.willChange > 0 && draggables.length >= config.willChange) {
		clone.style["will-change"] = "transform";
	}
	
	cloneStartX = cloneObj.rect.x;
	cloneStartY = cloneObj.rect.y;		
	
	document.body.appendChild(clone);
}

export function destroyClone() {
	if(clone === null) {return;}

	document.body.removeChild(clone);
	clone = null;
	cloneStartX = null;
	cloneStartY = null;	
}

export function updateClone(data) {
	if(clone === null) {return;}

	clone.style.transform = "translate("+data.deltaX+"px, "+data.deltaY+"px)";
}

export function createClone(draggables, config) {
	setupClone(draggables, config);
}