class PubSub {
	constructor() {
		const events = PubSub.events;
		for(const event in events) {
			this[events[event]] = [];
		}
	}
	
	subscribe(event, callback) {
		const subs = this[event];
		
		if(subs === undefined) {
			throw new Error("Tried to subscribe to undefined event: "+event);
		}		
		
		subs.push(callback);
	}
	
	notify(event, data) {
		const subs = this[event];
		
		if(subs === undefined) {
			throw new Error("Tried to notify undefined event: "+event);
		}
		
		for(let i=0, ii=subs.length; i<ii; i++) {
			subs[i](event, data);
		}
	}
	
	getEvent(name) {
		const event = PubSub.events[name];
		
		if(event === undefined) {
			throw new Error("Event not found with key: "+name);
		}
		
		return event;
	}
}

PubSub.events = {
	"dragstart": "dragstart",
	"dragmove": "dragmove",
	"dragstopOnDroppable": "droppingOver",
	"dragstopAfterAllDroppables": "droppedAll",
	"dragstopAlways": "dragstop",
};

export default PubSub;