import { handleOpenLinkForm } from './openLinkForm.js';
import { handleDisplayCreatedLink } from './displayCreatedLink.js';
import { handleCloseLinkForm } from './closeLinkForm.js';
import { handleLinkHover } from './linkHover.js';
import { handleLinkClick } from './linkClick.js';


import { createLink } from '../../linkItem.js';

const openLinkCreatorBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const addLinkForm = document.querySelector('.link-creator form');
const content = document.querySelector('.content');
const menu = document.querySelector('.category-menu');


export function handleLinkEvents() {
	handleOpenLinkForm();
	handleDisplayCreatedLink();
	handleCloseLinkForm();
	handleLinkHover();
	handleLinkClick();

	content.addEventListener('click', (e) => {
		handleRemoveLinkBtnClick(e);
		handleEditLinkBtnClick(e);
	});
}


// When the category has changed it needs to scroll to that category.
// When it hasnt changed it needs to replace the target link by new one.
// There is no way to get new just created link before add btn clicking of the form
// so the info about that link is able to catch with another handler.
// Because of the link list uses innerHTML to create its content
// there will be three versions of target link item:
// 1) the one in the old list content
// 2) the one in the new list content
// 3) and current edited one - this is the case
function handleEditLinkBtnClick(e) {
	const target = e.target;

	if (target.classList.contains('edit-btn')) {
		const { linkItem, list, position, category } = getTargetLinkInfo(target);
		
		openLinkCreatorBtn.click();
		putLinkDataIntoForm(linkItem);
		changeAddFormButtonText('Edit');
		
		addLinkForm.add.addEventListener('click', function interceptAddBtnclick() {
			const { category: newCategory } = getNewLinkData();
			const oldLink = list.children[position];
			
			if (category === newCategory) {	
				replaceLinkWithEditedOne(list, position);
			} else {
				//scrollContentTo(newCategory);
				focusOnJustMovedLink(newCategory);
			}
			oldLink.remove();
			changeAddFormButtonText('Add');
			
			addLinkForm.add.removeEventListener('click', interceptAddBtnclick);
		});
	}
}

function changeAddFormButtonText(newText) {
	addLinkForm.add.textContent = newText;
}

function scrollContentTo(category) {
	menu.querySelector(`a[href="#${replaceSpace(category)}"]`).click();
}

// just created link was moved to the new category so it needs to select this link to scroll to
function focusOnJustMovedLink(category) {
	const listItems = content.querySelector(`ul[data-category="${category}"]`).children;
	const linkItem = listItems[listItems.length - 1];
	linkItem.scrollIntoView(false);
	linkItem.click();
	highlightLinkForTime(linkItem);
	window.scrollBy(0, 20);
}

function highlightLinkForTime(linkItem) {
	linkItem.classList.add('highlight');
	setTimeout(() => {
		linkItem.classList.remove('highlight');
	}, 2000);
}

function replaceLinkWithEditedOne(linkList, linkInd) {
	const oldLink = linkList.children[linkInd];
	const newLink = linkList.querySelector('li:last-child');
	oldLink.after(newLink);
	newLink.click();
}

function getTargetLinkInfo(target) {
	const li = target.closest('li');
	const list = li.closest('.link-list');
	return {
		linkItem: li,
		list,
		category: list.dataset.category,
		position:  Array.from(list.children).indexOf(li)
	};
}



function closeSettingsWindow() {
	settingsWindow.classList.add('hide');
}


function closeAddLinkPanel(e) {
	const target = e.target;
	if (target.closest('.close-btn')) {
		closeSettingsWindow();
	}
}


function handleRemoveLinkBtnClick(e) {
	const target = e.target;
	if (target.classList.contains('remove-btn')) {
		target.closest('li').remove();
	}
}


function getNewLinkData() {
	const data = { link: '', topic: '', type: '', category: '' };
	for (let prop in data) {
		data[prop] = addLinkForm[prop].value;
	}
	return data;
}


function putLinkDataIntoForm(linkItem) {
	const list = linkItem.closest('.link-list');
	const linkType = linkItem.querySelector('.link-type');
	const linkTopic = linkItem.querySelector('.link-topic');
	const linkList = linkItem.closest('.link-list');

	addLinkForm.link.value = linkTopic.getAttribute('href');
	addLinkForm.topic.value = linkTopic.textContent;
	addLinkForm.type.value = replaceSpace(linkType.textContent);
	addLinkForm.category.value = linkList.dataset.category;
}


function replaceSpace(str) {
	return str.split(' ').join('-');
}