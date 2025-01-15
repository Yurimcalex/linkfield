import { REMOVE_BUTTON, elements } from '../../elements.js';
import { getFormData } from '../link/linkDisplay.js';
import { clickData } from '../link/linkRemove.js';
import { replaceSpace } from '../../utils.js';

const { content, linkForm, categoryMenu } = elements;


export function handleLinkCounterUpdate() {
	content.addEventListener('click', decreaseCounter);
	linkForm.add.addEventListener('click', increaseCounter);
}


function decreaseCounter(e) {
	const target = e.target;
	if (target.classList.contains(`${REMOVE_BUTTON}`)) {
		// link removal occurs first so there won't be the remove button in the dom
		const category = clickData.category;
		updateCounter(category, -1);
		updateSelect(category, -1);
	}
}


function increaseCounter(e) {
	const { category } = getFormData(linkForm);
	updateCounter(category, 1);
	updateSelect(category, 1);
}


function updateCounter(category, value) {
	const linkCounter = elements.select(categoryMenu, 'categoryMenuLinkCounter', category);
	const currentValue = Number(linkCounter.textContent);
	linkCounter.textContent = currentValue + value;
}


function updateSelect(category, value) {
	const select = elements.select(content, 'categoryHeaderSelect', category);
	const selectOptions = Array.from(select.options);
	const optionValues = selectOptions.map(option => option.value);
	optionValues.pop(); // remove "no" because it is not in the list as link type
	
	const listItems = elements.select(content, 'linkList', category).children;
	let itemTypes = Array.from(listItems).map(item => elements.select(item, 'linkType').textContent);
	itemTypes = Array.from(new Set(itemTypes));

	// case of link deletion
	if (value < 0) {
		optionValues.forEach((value, ind) => {
			if (!itemTypes.includes(value)) {
				selectOptions[ind].remove();
			}
		});
	// case of link addition
	} else {
		itemTypes.forEach(type => {
			if (!optionValues.includes(type)) {
				select.innerHTML += `<option value=${replaceSpace(type)}>${type}</option>`;
				optionValues.push(type);
			}
		});
	}
}