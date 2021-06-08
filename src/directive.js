function mergeDirectiveOptions(arg, value={}, mods={}) {
	//context.arg = v-dir:arg
	//context.value = v-dir="value"
	//context.modifiers = v-dir.mod1.mod2...
	
	const options = Object.assign({}, value, mods);
	options.mode = arg;
	return options;
}

function dragAndDrop(store, subsystems) {
	const dragAndDrop = subsystems.dragAndDropInstance;
	
	function create(el, context, vnode) {
		const config = subsystems.preprocessDirectiveConfig(el, mergeDirectiveOptions(context.arg, context.value, context.modifiers), vnode);
		dragAndDrop.addEventListener(el, config.elMoving, config, config.data, config.callbacks);			
	}
	
	function destroy(el, context, vnode) {
		dragAndDrop.removeEventListener(context.arg, el);
	}
	
	return {
		//vue2
		inserted: create,
		unbind: destroy,
		
		//vue3
		mounted: create,
		unmounted: destroy
	}
}

export default dragAndDrop;