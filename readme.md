# Drag and drop for Vue

Data driven drag and drop for complex drag and drop logic: define draggable elements and drop zones with Vue directives. Let Vuex handle the rest.

Example: given a collection of images and whenever an image is dragged over: 

- a trash icon: delete image
- a folder icon: move image
- a down arrow icon: download image
- another image: do something
- etc.


## Features

- Modern data driven approach using a type system for event delegation
- Drag arbitrary elements around (duh)
- Make arbitrary elements drop listeners (droppables)
- Same draggable can behave differently for specific droppabbles
- Minimally invasive: doesn't touch Vue-owned DOM, doesn't prevent or stop events
- Use as Vue directive or by [hot drag&drop](#hot-drag-and-drop) via Mixin
- **Version 1 is experimental. All features and interfaces may change.**

## Overview

Drag and drop was easy with jQuery UI. It is not so easy anymore in the MVC world. Here is the general logic how this plugin works it out:

- In the template you declare draggable/droppable elements.
- With a vuex register action, you define which droppables fire for which draggables.
- If they fire, the action you provided in the register call will be dispatched along with event information and template data.


## Demo

[See it in action.](https://joe-kerr.github.io/VueDragAndDrop/)


## Requirements

- Vue
- Vuex


## Install

**1)**
```
npm install @joe_kerr/vue-drag-and-drop
```


**2a) dev environment**

```javascript
import {installer} from "@joe_kerr/vue-drag-and-drop"; 
```


**2b) Pure node or browser**

```javascript
const dragAndDrop = require("path_to_node_modules/@joe_kerr/vue-drag-and-drop/dist/dragAndDrop.common.js");
```

or

```
<html> <script src="path_to_node_modules/@joe_kerr/vue-drag-and-drop/dist/dragAndDrop.umd.min.js"></script>
```


**3)**

```javascript
Vue.use(installer, configuration); 

// or

Vue.use(dragAndDrop.installer, configuration); 
```


## Configuration


Provide configuration properties on the second parameter of the Vue.use(plugin, **configProperties**) call.

### vuex< object > (mandatory)

A reference to your Vuex store instance.


### namespace< string >

The namespace of the store module, i.e. what you put in the dispatch call: store.dispatch("**namspace**/register"). Default: "drag&drop"


### directive< string >

The name of the directive, i.e. what you put in your template: <div v-**name_of_directive**="{type: 'sth'}" />. Default: "drag&drop"


## Template setup

In order to make elements draggable (reactive to mousedown events) or droppable (reactive to mouseup events), you use directives.

```html
<div v-drag&drop:draggable="{type: 'file', data: {whatever: 'you_like'}}">
	<span>some draggable</span>
</div>

<div v-drag&drop:droppable="{'type': 'trash'}">
	<span>some droppable</span>
</div>
```

## Directive options

Options can be provided to the directive in the quotation marks: v-directive=" ***{options}*** "

### type< string > (mandatory)

The type determines which draggable will match which droppable - and thereby which associated action will be dispatched ([see below](#link-draggables-with-droppables)).

### selector< string:DOM id >

Overrides the draggable element with the selector (html id). Can be used for a drag handle: put the draggable directive on the drag handle but set the selector to the parent element. This way, mousedown events only trigger for the handle but drag parameters are returned for the parent.

### data< var >

Arbitrary user data which will be provided to the final drag and drop action.

### dragmove< function >, drag< function > (deprecated)

Override the mousemove callback, i.e. mouse movement while dragging.

### dragstart< function >

Callback function that triggers after the mousedown event.

### dragstop< function >

Callback function that triggers after the mouseup event.

### multi< string >

Name of the property (computed, data, props) that holds a multi drag selection of DOM nodes that should be moved. Default: undefined

### cloneType< string >

What should the draggable clone/s look like.

- "copy": deep copy of the node/s being dragged
- "cheap": grey box instead of the node/s being dragged
- null: do not render clone

Default: "copy"

### cloneWillChangeThreshold< number >

How many draggables in a multiselection does it require to set the css property "willChange". Can improve performance greatly **if** used sparsely. Default: 0 (do not set willChange)


## Directive modifiers

Modifiers are dot-separated suffixes you can append to directives: v-directive.***modifier1***.***modifier2***...


### :draggable.only

Draggable only that has no associated droppable. This is intended for elements that just need to be dragged around. Does not need a type.


### :droppable.greedy

If a draggable is dropped over two droppables that are nested, the normal behaviour is that both droppables react to the draggable: the event is propagated, i.e. fires twice. 

If you want the first droppable to consume the event, set it to greedy. Greedy droppables do not need a type and can be placed as blockers.


## Link draggables with droppables

That what should happen when a certain draggable is dropped over a droppable is handled in vuex. Link draggables with droppables as follows:

```javascript
this.$store.dispatch("drag&drop/register", {dragType: "file", dropType: "trash", action: "deleteFile"});
```

Whenever an element of type "file" is dropped over an element with type "trash", the store action "deleteFile" is called. The "deleteFile" action is one that you have defined in your store. It gets as data parameter various [drag and drop information](#event-information).


### Hot drag and drop (Mixin)

Hot drag and drop gives you direct access to init a drag or drop operation. This way you can programmically init drag and drop without needing a nodes's mousedown/mouseup event. 

Hot D&D is installed per component via mixin.

```javascript
import {hotDNDMixin} from "@joe_kerr/vue-drag-and-drop";

export default {
	name: "some-component",
	mixins: [hotDNDMixin],
	
	//injects the following:
	methods: {
		hotDND(el, options, event) {...}
	}
}
```

**methods.hotDND(el< DOM node >, options< object >[, event< MouseEvenet >])**

- el: The DOM element that is the draggable or droppable.

- options: Same as [directive options](#directive-options) and [directive modifiers](#directive-modifiers)

- options.mode< string >: Additioally, "draggable" or "droppable" must be provided.

- event: Only needed for a draggable and is usually a MouseEvent. Currently, pageX and pageY are required.


### Event information

The store actions you [have registered](#link-draggables-with-droppables) receive the following data as their 2nd parameter:

- startX: x position on mousedown/dragstart
- startY: y position on mousedown/dragstart
- endX: x position on mouseup/dragsstop
- endY: y position on mouseup/dragsstop
- curX: x position on mousemove/dragging
- curY: y position on mousemove/dragging
- deltaX: distance on x-axis of mousemove since dragstart
- deltaY: distance on y-axis of mousemove since dragstart

- draggableEl: DOM element of the draggable
- draggableX: x position of DOM element
- draggableY: y position of DOM element
- draggableNewX: new x position after movement of DOM element
- draggableNewY: new y position after movement of DOM element
- draggableType: type of the draggable provided in the directive
- draggableData: user defined data provided in the directive
- draggableList: list of DOM nodes that are being dragged

- droppableEl: DOM element of the droppable element
- droppableX: x position of DOM element
- droppableY: y position of DOM element
- droppableType: type of the droppable provided in the directive
- droppableData: user defined data provided in the directive



### Only drag, do not drop

For cases when you just need to move an element.

```html
<div v-drag&drop:draggable.only="{dragstop: move}">
	<span>some draggable</span>
</div>

```


## Notes

- Some desirable features not yet implemented, e.g. multi drag, optional cloning, etc.

- The current draggable clone is not an exact copy. Some style rules will not be copied by ELEM.cloneNode. Technically, you would need to copy the entire style object with computedStyle calls. Some performance tests will be required to figure out how feasible this is.

- Overlapping droppables that are not nested are greedy. Do report if this is an issue.


## Versions

### 1.2.6
- Fix: A draggable event must precede a droppable event; otherwise void.

### 1.2.5
- New: Added system tests for drag and drop callback parameters
- Fix: Dragmove callback received mousedown event instead of mousemove event
- Fix: Dragging SVG elements without offsetLeft/-Top produced incorrect element coordinates

### 1.2.4
- New: Added draggable or droppable DOM event to drag and drop event data

### 1.2.3
- Fix: hotDND multidrag failed because mixin config processor used incorrect property on vnode
- Fix: Loose equal in test hid test setup error

### 1.2.2
- Fix: Helper threw for float pixel values instead of converting them to int

### 1.2.1
- Fix: Logic error in pixel parser helper
- Fix: Removed caching in helper which was broken beyond good and evil
- Fix: Drag & drop should now be independent of parent nodes' layout style

- Chg: General cleanup in code and tests

### 1.2.0
- New: Added hot drag&drop. Allows init drag and drop operation programmatically
- Chg: Test report now also contains system test log
- Fix: Droppable data parameters did not update if draggable listener got removed mid dragging


### 1.1.1
- Fix: Removed typo in variable name that caused NaN width/height
- Chg: Added unit test for coords/dims/css extraction which was not covered by system test

### 1.1.0
- New: Dragging of multiple elements possible
- New: Added delta values to drag and drop event data

- Chg: Ensure callbacks parameter has proper interface
- Chg: Improved internal callback handling for better extensibility

- Fix: Params parameter now defaults to empty object instead of undefined
- Fix: Draggable and clone coordinates/dimensions should be pixel perfect now

### 1.0.2
- Fix: Drag callback replaced mousemove instead of being called by mousemove
- Fix: Demo now displays draggable clone correctly
- Fix: Draggable clone falls back to absolute position

### 1.0.1
- Fix: Draggable (clone) now moved properly when viewport not a zero-zero
- Fix: Use width and height instead of w and h of draggable rect
- Fix: Set valid script source in demo site

### 1.0.0
- First public release


## Copyright

MIT (c) Joe Kerr 2019

