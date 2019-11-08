<template>
<section>
	<div id="directive" v-drag&drop:draggable.only="{dragstart: directiveStart, data: 'directive'}">1</div>
	<div id="mixin" ref="mixin" @mouseenter="mixinStart">2</div>
</section>	
</template>

<script>

const {hotDNDMixin} = require("../../src/index.js");

export default {
	name: "root",
	mixins: [hotDNDMixin],
	methods: {
		directiveStart(event, data) {this.directiveResponse = data.draggableData;},
		
		mixinStart(event) {
			const config = {
				mode: "draggable",
				only: true,
				data: "mixin",
				dragstart: (event2, data)=>{this.mixinResponse = data.draggableData;}
			};
			this.hotDND(this.$refs.mixin, config, event);
		}
	},
	data() {
		return {
			directiveResponse: null,
			mixinResponse: null
		}
	}
};

</script>