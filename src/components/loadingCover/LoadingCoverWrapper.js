import LoadingCover from './LoadingCover.js';
import { useSelector } from '../../redux/redux.js';
import { selectAction } from '../../redux/actionSlice.js';


export default class LoadingCoverWrapper {
	constructor(store) {
		this.component = null;
		useSelector(this, store, [ selectAction ]);

		this.updateActions = {
			'links/linksLoaded/fulfilled': true
		};
	}

	mount() {
		this.component = new LoadingCover();
	}

	update() {
		const action = this.selectAction();
		if (!(action in this.updateActions)) return;
		
		this.component.update();
	}
}