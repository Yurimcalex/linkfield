import { createLink } from '../ui.js';

const openLinkCreatorBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const addLinkForm = document.querySelector('.link-creator form');
const content = document.querySelector('.content');
const menu = document.querySelector('.category-menu');


export function handleLinkEvents() {
	openLinkCreatorBtn.addEventListener('click', () => {
		openSettingsWindow();
		resetAddLinkForm();
	});

	addLinkForm.add.addEventListener('click', displayNewLink);
	// handle close button click on "add new link" panel
	settingsWindow.addEventListener('click', closeAddLinkPanel);

	content.addEventListener('click', (e) => {
		handleRemoveLinkBtnClick(e);
		handleEditLinkBtnClick(e);
	});

	handleLinkHover();
}


function handleLinkHover() {
	let currElm = null;
	content.addEventListener('mouseover', (e) => {
		if (currElm) return;
		let target = event.target.closest('.link-list-item');
		if (!target) return;
		currElm = target;
		toggleLinkControlsDisplay(currElm);
	});

	content.addEventListener('mouseout', (e) => {
		if (!currElm) return;
		let relatedTarget = event.relatedTarget;
		while (relatedTarget) {
		  if (relatedTarget == currElm) return;
		  relatedTarget = relatedTarget.parentNode;
		}
		toggleLinkControlsDisplay(currElm);
	 	currElm = null;
	});
}

function toggleLinkControlsDisplay(linkItem) {
	const controlsCont = linkItem.querySelector('.link-controls')
	controlsCont.classList.toggle('visibility');
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
				scrollContentTo(newCategory);
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

function replaceLinkWithEditedOne(linkList, linkInd) {
	const oldLink = linkList.children[linkInd];
	const newLink = linkList.querySelector('li:last-child');
	oldLink.after(newLink);
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


function openSettingsWindow() {
	settingsWindow.classList.remove('hide');
}

function closeSettingsWindow() {
	settingsWindow.classList.add('hide');
}


function displayNewLink(e) {
	const newlinkData = getNewLinkData();
	createLink(newlinkData);
	closeSettingsWindow();
	e.preventDefault();
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

function resetAddLinkForm() {
	addLinkForm.link.value = '';
	addLinkForm.topic.value = '';
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