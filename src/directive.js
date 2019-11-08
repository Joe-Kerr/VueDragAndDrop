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

	return {
		inserted(el, context, vnode) {
			const config = subsystems.preprocessDirectiveConfig(el, mergeDirectiveOptions(context.arg, context.value, context.modifiers), vnode);
			dragAndDrop.addEventListener(el, config.elMoving, config, config.data, config.callbacks);			
		},
		
		unbind(el, context, vnode) {
			dragAndDrop.removeEventListener(context.arg, el);
		}
	}
}

export default dragAndDrop;