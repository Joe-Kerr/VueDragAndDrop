import {cats4Vue} from "cats4vue";
import installDirective from "./directive.js";
import DragAndDrop from "./DragAndDrop.js";
import PubSub from "./PubSub.js";
import * as cloneController from "./cloneController";

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
	const options = parseConfig(config);
	const {namespace} = options;
	const {vuex} = config;
	
	cats4Vue.registerVuexModule(vuex, namespace, store);

	const subsystems = {DragAndDrop, PubSub, cloneController};
	Vue.directive(options.directive, installDirective(vuex, subsystems, {namespace, delegateEvents: options.delegateEvents}));
}}

export default installer;