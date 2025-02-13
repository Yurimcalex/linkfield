import Opener from './Opener.js';
import { useSelector, useDispatch } from '../../redux/redux.js';
import { selectMenuVisibility } from '../../redux/uiSlice.js';
import { selectAction } from '../../redux/actionSlice.js';
import { toggleMenuOpener } from '../actions.js';


export default class Wrapper {
	constructor(store) {
		this.component = null;
		useSelector(this, store, [ selectMenuVisibility, selectAction ]);
		useDispatch(this, store, [ toggleMenuOpener ]);

		this.updateActions = {
			'ui/categoryMenuToggled': true,
			'links/linksLoaded/fulfilled': true
		};
	}

	mount() {
		this.component = new Opener(this.toggleMenuOpener);
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;

		if (action === 'links/linksLoaded/fulfilled') {
			this.component.remove();
			this.mount();
			return;
		}

		this.component.update(this.selectMenuVisibility());
	}
}