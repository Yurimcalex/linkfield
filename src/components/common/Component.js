import { CONTENT } from '../classNames.js';
import { replaceSpace } from '../../ui/utils.js';


export default class Component {
	constructor(storeAction) {
		this.content = document.querySelector(`.${CONTENT}`);
		this.DY = 50; // takes into account the height of the menu bar

		window.addEventListener('resize', () => {
			storeAction(this.getIsSmallScreen());
		});
	}

	getIsSmallScreen() {
	  const SMALL_SCREEN_WIDTH = 650;
	  return window.innerWidth <= SMALL_SCREEN_WIDTH;
	}

	// scroll the window for large screen, scroll the content for small screen
	scrollContentTo(category, isSmallScreen) {
		if (!category) return;
		const id = replaceSpace(category);
		const categoryHeader = document.getElementById(id);
		const container = isSmallScreen ? window : this.content;
		container.scrollTo(0, categoryHeader.offsetTop - (isSmallScreen ? this.DY : 0));
		history.pushState(null, null, id);
	}

	update(category, isSmallScreen) {
		this.scrollContentTo(category, isSmallScreen);
	}
}