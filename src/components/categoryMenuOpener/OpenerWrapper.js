import Opener from './Opener.js';
import { selectMenuVisibility } from '../../redux/uiSlice.js';
import { toggleMenuOpener } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.toggleOpener = toggleMenuOpener(store.useDispatch());
		this.selectMenuVisibility = store.useSelector(selectMenuVisibility);
	}

	mount() {
		this.component = new Opener(this.toggleOpener);
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