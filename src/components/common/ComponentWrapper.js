import Component from './Component.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectMenuCategory, selectIsSmallScreen } from '../../redux/uiSlice.js';
import { selectAction } from '../../redux/actionSlice.js';
import { changeScreenSize, pickMenuCategory } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		useSelector(this, store, [ selectMenuCategory, selectIsSmallScreen, selectAction ]);
		useDispatch(this, store, [ changeScreenSize, pickMenuCategory ]);

		this.updateActions = {
			'ui/categoryMenuToggled': true,
			'ui/screenSizeChanged': true
		};
	}

	mount() {
		this.component = new Component(this.changeScreenSize, this.pickMenuCategory);
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;

		this.component.update(this.selectMenuCategory(), this.selectIsSmallScreen());
	}
}