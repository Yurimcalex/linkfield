import { dom } from '../elements.js';
import { CONTENT } from '../classNames.js';


export default class Content {
	constructor() {
		this.node = dom.getContent();
	}

	remove() {
		Array.from(this.node.children).slice(1).forEach(n => n.remove());
	}

	update() {}
}