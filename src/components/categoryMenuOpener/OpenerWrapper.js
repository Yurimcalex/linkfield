import Opener from './Opener.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectMenuVisibility } from '../../redux/uiSlice.js';
import { toggleMenuOpener } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		this.isMenuOpened = null;
		useSelector(this, store, [ selectMenuVisibility ]);
		useDispatch(this, store, [ toggleMenuOpener ]);
	}

	mount() {
		this.component = new Opener(this.toggleMenuOpener);
		this.isMenuOpened = this.selectMenuVisibility();
	}

	update() {
		const isMenuOpened = this.selectMenuVisibility();
		if (isMenuOpened !== this.isMenuOpened) {
			this.component.update(isMenuOpened);
			this.isMenuOpened = isMenuOpened;
		}
	}
}