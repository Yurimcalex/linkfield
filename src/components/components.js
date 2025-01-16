import CategoryMenu from './categoryMenu.js';
import { selectCategoryData } from '../redux/linksSlice.js';




export function initUI(store) {
	const { store: reduxStore , useSelector, useDispatch } = store;
	const categoryMenu = createCategoryMenu(useSelector);
}


function createCategoryMenu(useSelector) {
	const selectData = useSelector(selectCategoryData);
	return new CategoryMenu(selectData());
}