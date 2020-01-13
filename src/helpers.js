function pxToInt(px) {
	if(px === "") {
		return 0;
	}
	
	const intVal = parseInt(px.replace("px", ""));
	const test = ""+px;
	
	if(test.indexOf(" ") > -1 || !px.endsWith("px") || isNaN(intVal)) {
		throw new Error("Failed to parse pixel value. Got: "+px);
	}
	
	return intVal;
}

// https://stackoverflow.com/a/20407357
function getCalculatedOffset(el, rect, scrollX, scrollY) {
	const bailVpPos = {x:0, y:0};
	const getVpPos = function getVpPos(el) {
        if(el === null || el.parentNode === null || el.parentNode.tagName === undefined) {
			return bailVpPos;
		}
		else if(el.parentNode.tagName.toLowerCase() === 'svg') {
            return el.parentNode.getBoundingClientRect();
        }
        return getVpPos(el.parentNode);
    }   

   const elPos = rect;
   const vpPos = getVpPos(el);
   
   return {
        y: elPos.y - vpPos.y + 2*scrollY,
        x: elPos.x - vpPos.x + 2*scrollX
    };	
}

//* General: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
//			 https://docs.microsoft.com/en-us/previous-versions//hh781509(v=vs.85)

//*box-sizing https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
// "content-box": outer width = inner width + padding + border
// "border-box": outer width = (inner width - padding - border) + padding + border

//*style.width 
// "inner width" (not scaled)

//*clientWdith (https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
// inner width + padding | 0 for inline/css-less (not scaled)

//*offsetWdith (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
// inner width + padding + border + scrollBar | 0 if hidden (not scaled)

//*boundingRect
// innerWidth + padding + margin + border + scrollBar (scaled)

export function getRectAbs(el) {
	const rectData = {
		position: "",
		
		//absolute page (absolute) or viewport (fixed) position minus marginLeft/Top
		absX: 0,
		absY: 0,
		
		//absolute dimensions including padding, border
		outerWidth: 0,
		outerHeight: 0,
			
		//position within containing parent minus marginTop/Left
		offsetX: 0,
		offsetY: 0,
		
		//equivalent to css width
		width: 0,
		height: 0,		
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

	const scrollX = (elPos === "fixed") ? 0 : window.pageXOffset;
	const scrollY = (elPos === "fixed") ? 0 : window.pageYOffset;
	
	const offset = (el.offsetLeft !== undefined) ? {x: el.offsetLeft, y: el.offsetTop} : getCalculatedOffset(el, rect, scrollX, scrollY);
	
	rectData.position = elPos;
		
	rectData.absX = rect.x + scrollX - marginLeft;
	rectData.absY = rect.y + scrollY - marginTop;
	
	rectData.offsetX = offset.x - marginLeft;
	rectData.offsetY = offset.y - marginTop;
	
	rectData.outerWidth = rect.width;
	rectData.outerHeight = rect.height;
	
	rectData.width = rectData.outerWidth - borderH - paddingH;
	rectData.height = rectData.outerHeight - borderV - paddingV;		
	
	return rectData;	
}