export default class Component {
	constructor(storeAction) {
		window.addEventListener('resize', () => {
			storeAction(this.getIsSmallScreen());
		});
	}

	getIsSmallScreen() {
	  const SMALL_SCREEN_WIDTH = 650;
	  return window.innerWidth <= SMALL_SCREEN_WIDTH;
	}
}