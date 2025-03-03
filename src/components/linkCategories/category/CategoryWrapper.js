import Category from './Category.js';
import Header from './header/HeaderWrapper.js';
import { useSelector, useDispatch } from '../../../redux/redux.js';
import { selectLinksByCategory } from '../../../redux/linksSlice.js';
import { openLinkFormForEditing, removeLink } from '../../actions.js';


export default class CategoryWrapper {
	constructor(store, category) {
		this.store = store;
		this.category = category;
		this.component = null;
		this.child = null;
		useSelector(this, store, [ selectLinksByCategory ]);
		useDispatch(this, store, [ openLinkFormForEditing, removeLink ]);
	}

	mount() {
		const links = this.selectLinksByCategory(this.category);
		this.component = new Category( this.category, links, this.removeLink, this.openLinkFormForEditing );
		this.mountChild(this.store, this.category);
	}

	update(data) {
		this.component.update(data);
		this.updateChild();
	}

	mountChild(store, category) {
		this.child = new Header(store, category);
		this.child.mount();
	}

	updateChild() {
		this.child.update();
	}
}