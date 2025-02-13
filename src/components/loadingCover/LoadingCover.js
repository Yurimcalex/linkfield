import { dom } from '../elements.js';
import { LOADING_COVER_ELEMENT_FOCUS } from '../classNames.js';


export default class LoadingCover {
	constructor() {
		this.node = dom.getLoadingCover();
		this.create();
		this.timer;
	}

	create() {
		const elements = this.node.children[0].children;
		const len = elements.length;

		let counter = 0;
		let prev;
		this.timer = setInterval(() => {
			const ind = counter % len;
			const curr = elements[ind];
			curr.classList.add(`${LOADING_COVER_ELEMENT_FOCUS}`);
			if (prev) prev.classList.remove(`${LOADING_COVER_ELEMENT_FOCUS}`);
			prev = curr;
			counter += 1;
		}, 120);
		
	}

	update() {
		this.node.style.display = 'none';
		clearInterval(this.timer);
	}
}