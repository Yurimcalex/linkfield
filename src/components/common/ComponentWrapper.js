import Component from './Component.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { changeScreenSize, pickMenuCategory } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.changeScreenSize = changeScreenSize(store.useDispatch());
		this.pickMenuCategory = pickMenuCategory(store.useDispatch());

		this.selectMenuCategory = store.useSelector(selectMenuCategory);
		this.selectIsSmallScreen = store.useSelector(selectIsSmallScreen);
	}

	mount() {
		this.component = new Component(this.changeScreenSize, this.pickMenuCategory);
	}

	update() {
		const selectedCategory = this.selectMenuCategory();
		const isSmallScreen = this.selectIsSmallScreen();
		this.component.update(selectedCategory, isSmallScreen);
	}
}