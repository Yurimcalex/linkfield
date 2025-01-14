import { LINK_CATEGORY_HEADER, elements } from '../../elements.js';

const { content } = elements;
let currElm = null;

export function handleCategoryHeaderHover() {
	content.addEventListener('mouseover', mouseover);
	content.addEventListener('mouseout', mouseout);	
}


function mouseover(e) {
	if (currElm) return;
	let target = event.target.closest(`.${LINK_CATEGORY_HEADER}`);
	if (!target) return;
	currElm = target;
	toggleArranger(currElm);
}


function mouseout(e) {
	if (!currElm) return;

	let relatedTarget = event.relatedTarget;
	while (relatedTarget) {
		 if (relatedTarget == currElm) return;
		 relatedTarget = relatedTarget.parentNode;
	}

	toggleArranger(currElm);
	currElm = null;
}


function toggleArranger(container) {
	elements
		.select(container, 'linkArranger')
		.parentNode
		.classList.toggle('visibility');
}