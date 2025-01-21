import LinkFrom from './LinkForm.js';
import { selectCategoryNames, selectLinkTypes, selectEditingLink } from '../../../redux/linksSlice.js';
import { selectLinkFormMode } from '../../../redux/uiSlice.js';
import { createNewLink, editPickedLink } from '../../actions.js';


export default class LinkFromWrapper {
	constructor(store) {
		this.selectCategoryNames = store.useSelector(selectCategoryNames);
		this.selectLinkTypes = store.useSelector(selectLinkTypes);
		this.selectLinkFormMode = store.useSelector(selectLinkFormMode);
		this.selectEditingLink = store.useSelector(selectEditingLink);
		this.createNewLink = createNewLink(store.useDispatch());
		this.editPickedLink = editPickedLink(store.useDispatch());
	}

	mount() {
		const categories = this.selectCategoryNames();
		const types = this.selectLinkTypes();
		const mode = this.selectLinkFormMode();
		this.component = new LinkFrom(categories, types, this.createNewLink, this.editPickedLink);
		this.categories = categories;
		this.types = types;
		this.mode = mode;
	}

	update() {
		const mode = this.selectLinkFormMode();
		if (mode !== this.mode) {
			this.component.update(mode, this.selectEditingLink());
			this.mode = mode;
		}
	}
}