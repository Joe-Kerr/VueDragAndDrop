let rectId = null;
let rectCache = null;

function pxToInt(px) {
	if(px === "") {return 0;}
	
	const intVal = parseInt(px.replace("px", ""));
	
	if(isNaN(intVal)) {
		throw new Error("Failed to parse pixel value");
	}
	
	return intVal;
}

//* General: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
//			 https://docs.microsoft.com/en-us/previous-versions//hh781509(v=vs.85)

//*box-sizing https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
// "content-box": outer width = inner width + padding + border
// "border-box": outer width = (inner width - padding - border) + padding + border

//*style.width 
// "inner width"

//*clientWdith (https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
// inner width + padding | 0 for inline/css-less

//*offsetWdith (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
// inner width + padding + border + scrollBar | 0 if hidden

//*boundingRect
// innerWidth + padding + margin + border + scrollBar

export function getRectAbs(el) {
	if(rectId === el) {
		return rectCache;
	}
	
	const rectData = {
		position: "",
		
		//layout box
		outerX: 0,
		outerY: 0,
		outerWidth: 0,
		outerHeight: 0,
		
		//equiv to css vals
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};	
	
	const rect = el.getBoundingClientRect();
	const cstyles = window.getComputedStyle(el);
	const elPos = cstyles.position;
	
	const borderH = pxToInt(cstyles.borderLeftWidth) + pxToInt(cstyles.borderRightWidth);
	const borderV = pxToInt(cstyles.borderTopWidth) + pxToInt(cstyles.borderBottomWidth);	
	const paddingH = pxToInt(cstyles.paddingLeft) + pxToInt(cstyles.paddingRight);
	const paddingV = pxToInt(cstyles.paddingTop) + pxToInt(cstyles.paddingBottom);
	
	const marginLeft = pxToInt(cstyles.marginLeft);
	const marginTop = pxToInt(cstyles.marginTop);
		
	rectData.position = elPos;
	
	rectData.outerX = (elPos !== "fixed") ? rect.x+window.pageXOffset : rect.x;
	rectData.outerY = (elPos !== "fixed") ? rect.y+window.pageYOffset : rect.y;
	rectData.left = rectData.outerX - marginLeft;
	rectData.top = rectData.outerY - marginTop;

	rectData.outerWidth = rect.width;
	rectData.outerHeight = rect.height;
	rectData.width = rect.outerWidth - borderH - paddingH;;
	rectData.height = rect.outerHeight - borderV - paddingV;
	
console.log(rectData)		
	
	rectId = el;
	rectCache = rectData;
	
	return rectData;	
}