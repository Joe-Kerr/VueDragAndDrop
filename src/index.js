import {cats4Vue} from "cats4vue";
import installDirective from "./directive.js";
import DragAndDrop from "./DragAndDrop.js";
import {registerVuexInstance as registerVuexAtConfigPreprocessor, preprocessMixinConfig, preprocessDirectiveConfig} from "./configPreprocessor.js";
import store from "./store.js";

const dragAndDropInstance = new DragAndDrop();

function parseConfig(config={}) {
	const defaults = {
		namespace: {type: "string", default: "drag&drop"},
		directive: {type: "string", default: "drag&drop"},
		vuex: {type: null}
	};	
	
	return cats4Vue.configParser(config, defaults);
}

export const hotDNDMixin = {
	methods: {
		hotDND(el, options, event) {
			const config = preprocessMixinConfig(el, options, this);			
			dragAndDropInstance.hotDND(el, config, config.data, event, config.callbacks);
		}
	}
}

export const installer = {install: function(Vue, config) {
	const options = parseConfig(config);
	const {namespace} = options;
	const {vuex} = config;
	
	cats4Vue.registerVuexModule(vuex, namespace, store);
	
	registerVuexAtConfigPreprocessor(vuex, namespace);

	const subsystems = {dragAndDropInstance, preprocessDirectiveConfig};
	Vue.directive(options.directive, installDirective(vuex, subsystems));
}}

export default installer;