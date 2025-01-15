import { elements } from '../../elements.js';
import { editableItem } from './linkFormOpen.js';
import { getFormData, closeSettingsWindow } from './linkDisplay.js';
import { createLink } from '../../ui.js';
import { removeCurrentFocus } from './linkClick.js';


const { linkForm: form, content } = elements;

export function handleLinkEdit() {
	form.edit.addEventListener('click', (e) => {
		e.preventDefault();
		editData();
	});
}


// When the category has changed it needs to scroll to that category.
// When it hasnt changed it needs to replace the target link by new one.
// Because of the link list uses innerHTML to create its content
// there will be three versions of target link item:
// 1) the one in the old list content
// 2) the one in the new list content
// 3) and current edited one - this is the case
function editData() {
	const { list, position, category } = editableItem;	
	const formData = getFormData(form);
	
	createLink(formData);
	removeCurrentFocus();
	
	const oldLink = list.children[position];
	const { category: newCategory } = formData;		
	if (category === newCategory) {
		replaceLinkWithEditedOne(list, position);
	} else {
		focusOnLink(newCategory);
	}

	oldLink.remove();
	closeSettingsWindow();
}


function replaceLinkWithEditedOne(linkList, linkInd) {
	const oldLink = linkList.children[linkInd];
	const newLink = elements.select(linkList, 'lastListItem');
	oldLink.after(newLink);
	newLink.click();
	highlightLinkForTime(newLink);
}


export function focusOnLink(category) {
	const listItems = elements.select(content, 'linkList', category).children;
	const link = listItems[listItems.length - 1];

	if (!isVisible(link)) {
		link.scrollIntoView(false);
	}
	
	link.click();
	highlightLinkForTime(link);
}

function isVisible(link) {
	const { top, height } = link.getBoundingClientRect();
	return top > 0 && top < window.innerHeight - height;
}

function highlightLinkForTime(linkItem) {
	linkItem.classList.add('highlight');
	setTimeout(() => {
		linkItem.classList.remove('highlight');
	}, 2000);
}