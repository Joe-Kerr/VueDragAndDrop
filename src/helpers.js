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
	
	rectData.position = elPos;
		
	rectData.absX = rect.x + scrollX - marginLeft;
	rectData.absY = rect.y + scrollY - marginTop;
	
	rectData.offsetX = el.offsetLeft - marginLeft;
	rectData.offsetY = el.offsetTop - marginTop;
	
	rectData.outerWidth = rect.width;
	rectData.outerHeight = rect.height;
	
	rectData.width = rectData.outerWidth - borderH - paddingH;;
	rectData.height = rectData.outerHeight - borderV - paddingV;		
	
	return rectData;	
}