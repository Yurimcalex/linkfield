import Component from './Component.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { changeScreenSize, pickMenuCategory } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		useSelector(this, store, [ selectMenuCategory, selectIsSmallScreen ]);
		useDispatch(this, store, [ changeScreenSize, pickMenuCategory ]);
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