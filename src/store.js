import {mutations} from "vuex-heman";


export default {
	namespaced: true,
	
	state: {
		dragging: false,
		id: -1,
		type: null,
		
		callbacks: {}
	},
	
	getters: {
		dragging(state) {return state.dragging;},
		
		draggableId(state) {return (state.dragging) ? state.id : null;},
		
		draggableType(state) {return (state.dragging) ? state.type : null;}
	},
	
	mutations: {
		set: mutations.setPropVal,
		
		addCallback(state, data) {
			const dragType = data.dragType;
			const dropType = data.dropType;
			const act = data.action;

			if(state.callbacks[dragType] === undefined) {
				state.callbacks[dragType] = {};
			}

			state.callbacks[dragType][dropType] = act;				
		}
	},
	
	actions: {
		
		draggable(store, event) {
			store.commit("set", {prop: "dragging", val: true});
			store.commit("set", {prop: "type", val: event.draggableType});
			
			if(event.draggableData !== null && event.draggableData.id !== undefined) {
				store.commit("set", {prop: "id", val: event.draggableData.id});
			}
		},
		
		droppable(store, event) {
			const callbacks = store.state.callbacks;
			const {draggableType, droppableType} = event;
		
			if(callbacks[draggableType] !== undefined && callbacks[draggableType][droppableType] !== undefined ) {
				return store.dispatch(callbacks[draggableType][droppableType], event, {root: true})
			}
		},
		
		done(store) {
			store.commit("set", {prop: "dragging", val: false});
			store.commit("set", {prop: "id", val: -1});
			store.commit("set", {prop: "type", val: null});		
		},
		
		register(store, data) {
			if(typeof data.action === "undefined" || typeof data.dragType === "undefined" || typeof data.dropType === undefined) {
				throw new Error("Missing paratmeter/s: please provide: {action, dragType, dropType}");
			}
			
			store.commit("addCallback", data);
		}
	}
};