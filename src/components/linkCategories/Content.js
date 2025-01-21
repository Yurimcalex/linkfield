import { dom } from '../elements.js';
import { CONTENT } from '../classNames.js';


export default class Content {
	constructor() {
		this.node = dom.getContent();
	}

	update() {}
}