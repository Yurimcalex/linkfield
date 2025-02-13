import { dom } from '../elements.js';


export default class LoadingCover {
	constructor() {
		this.node = dom.getLoadingCover();
	}

	create() {}

	update() {
		this.node.style.display = 'none';
	}
}