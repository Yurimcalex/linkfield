import { LINK_LIST_ITEM, elements } from '../../elements.js';

const { content } = elements;
let prevElm = null;


export function handleLinkClick() {
	content.addEventListener('click', сlick);
}


function сlick(e) {
	const target = e.target.closest(`.${LINK_LIST_ITEM}`);
	if (target) {
		if (prevElm) removeCurrentFocus();
		target.classList.add('current');
		prevElm = target;
	}
}


export function removeCurrentFocus() {
	if (prevElm) prevElm.classList.remove('current');
}