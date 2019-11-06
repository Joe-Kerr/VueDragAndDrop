import {getRectAbs as _getRectAbs} from "./helpers.js";

let clone = null;
let cloneStartX = null;
let cloneStartY = null;

function getRect(el) {
	return _getRectAbs(el);
}

// Not really carbon copy, see e.g. https://stackoverflow.com/questions/1848445/duplicating-an-element-and-its-style-with-javascript
function createCopyClone(el) {
	const clone = el.cloneNode(true);
	const style = document.defaultView.getComputedStyle(el, null);
	const directions = ["Top", "Left", "Bottom", "Right"];
	const borderProps = ["Color", "Style", "Width"];
	
	clone.style.color = style.color;
	clone.style.backgroundColor = style.backgroundColor;
		
	for(let i=0, ii=directions.length; i<ii; i++) {
		for(let j=0, jj=borderProps.length; j<jj; j++) {
			const key = "border"+directions[i]+borderProps[j];
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
	
	let top = initRect.outerY;
	let left = initRect.outerX;
	let bottom = top + initRect.outerHeight;
	let right = left + initRect.outerWidth;
	
	els.forEach((el)=>{ 
		const rect = getRect(el);
		if(rect.outerX < left) { left = rect.outerX; }
		if(rect.outerY < top) { top = rect.outerY; }
		if(rect.outerX + rect.outerWidth > right) { right = rect.outerX + rect.outerWidth; };
		if(rect.outerY + rect.outerHeight > bottom) { bottom = rect.outerY + rect.outerHeight; };
		postProcRects.push(rect);			
	});
	
	els.forEach((el, i)=>{
		const rect = postProcRects[i];
		const pos = rect.position;			
		const clonedEl = (type === "copy") ? createCopyClone(el) : createCheapClone(el);		
		
		//el [+ fixedToAbsolute] - relativeToParent
		const x = rect.left + ( (pos === "fixed") ? window.pageXOffset : 0 ) - left;
		const y = rect.top + ( (pos === "fixed") ? window.pageYOffset : 0 ) - top;
		
		clonedEl.id = "cloned_"+clonedEl.id;
		clonedEl.style.position = "absolute";
		clonedEl.style.left = x+"px";
		clonedEl.style.top = y+"px";			
		clonedEl.style.width = rect.width+"px";
		clonedEl.style.height = rect.height+"px";		

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

	return {clone, rect: {left: x, top: y, width: w, height: h}};
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
	else {
		clone.style.position = pos;
	}
	
	clone.style.width = originalRect.width+"px";
	clone.style.height = originalRect.height+"px";
			
	return {clone, rect: originalRect};
}	

function setupClone(draggables, config) {		
	if(config.type === null) {return;}	

	const cloneObj = (draggables.length === 1) ? setupSingleClone(draggables[0], config.type) : setupMultiClone(draggables, config.type);	

	const x = cloneObj.rect.left;
	const y = cloneObj.rect.top;
	
	clone = cloneObj.clone;
	clone.id = "cloneAnchor";
	clone.style.left = x+"px";
	clone.style.top = y+"px";		
	clone.style.pointerEvents = "none";	
	clone.style.transition = "0s";
	
	if(config.willChange > 0 && draggables.length >= config.willChange) {
		clone.style["will-change"] = "transform";
	}
	
	cloneStartX = x;
	cloneStartY = y;
	
	document.body.appendChild(clone);
}

export function destroyClone() {
	//return
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