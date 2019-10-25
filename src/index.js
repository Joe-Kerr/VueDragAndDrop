import {cats4Vue} from "cats4vue";
import installDirective from "./directive.js";
import DragAndDrop from "./DragAndDrop.js";

import store from "./store.js";

function parseConfig(config={}) {
	const defaults = {
		namespace: {type: "string", default: "drag&drop"},
		directive: {type: "string", default: "drag&drop"},
		vuex: {type: null}
	};	
	
	return cats4Vue.configParser(config, defaults);
}

export const installer = {install: function(Vue, config) {
	const {vuex} = config;
	
	const options = parseConfig(config);
	const {namespace} = options;
	
	cats4Vue.registerVuexModule(vuex, namespace, store);

	Vue.directive(options.directive, installDirective(vuex, DragAndDrop, {namespace, delegateEvents: options.delegateEvents}));
}}

export default installer;