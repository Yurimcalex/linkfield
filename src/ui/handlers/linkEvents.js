import { createLink } from '../ui.js';

const openLinkCreatorBtn = document.querySelector('.link-creator-opener');
const settingsWindow = document.querySelector('.settings-window');
const addLinkForm = document.querySelector('.link-creator form');
const content = document.querySelector('.content');
const menu = document.querySelector('.category-menu');


export function handleLinkEvents() {
	openLinkCreatorBtn.addEventListener('click', () => {
		settingsWindow.classList.remove('hide');
	});

	addLinkForm.add.addEventListener('click', (e) => {
		const linkData = getNewLinkData();
		e.preventDefault();
		createLink(linkData);
		settingsWindow.classList.add('hide');
	});

	settingsWindow.addEventListener('click', (e) => {
		const target = e.target;
		if (target.closest('.close-btn')) {
			settingsWindow.classList.add('hide');
		}
	});

	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('remove-btn')) {
			target.closest('li').remove();
		}

		if (target.classList.contains('edit-btn')) {
			const li = target.closest('li');
			const list = li.closest('.link-list');
			const category = list.dataset.category;
			// it is needes because after add btn has clicked the new list content will be created (because of innerHTML)
			// and so target li wont be there
			const liInd = Array.from(list.children).indexOf(li);
			
			openLinkCreatorBtn.click();
			putLinkDataIntoForm(li);
			// when the category has changed it needs to scroll to that category
			// when it hasnt changed it needs to replace the target link by new one
			// because of there is no way to get new just created link before add btn clicking of the form
			// the info about that link is able to catch with another handler
			addLinkForm.add.addEventListener('click', function interceptAddBtnclick() {
				const { category: newCategory } = getNewLinkData();
				const newLink = list.querySelector('li:last-child');
				const oldLink = list.children[liInd];
				
				if (category === newCategory) {	
					oldLink.after(newLink);
				} else {
					menu.querySelector(`a[href="#${replaceSpace(newCategory)}"]`).click();
				}
				
				oldLink.remove();
				addLinkForm.add.removeEventListener('click', interceptAddBtnclick);
			});
		}
	});
}


function getNewLinkData() {
	const data = {
		link: addLinkForm.link.value,
		topic: addLinkForm.topic.value,
		type: addLinkForm.type.value,
		category: addLinkForm.category.value
	};
	addLinkForm.link.value = '';
	return data;
}


function putLinkDataIntoForm(linkItem) {
	const list = linkItem.closest('.link-list');
	const linkType = linkItem.querySelector('.link-type');
	const linkTopic = linkItem.querySelector('.link-topic');
	const linkList = linkItem.closest('.link-list');

	addLinkForm.link.value = linkTopic.getAttribute('href');
	addLinkForm.topic.value = linkTopic.textContent;
	addLinkForm.type.value = linkType.textContent;
	addLinkForm.category.value = linkList.dataset.category;
}


function replaceSpace(str) {
	return str.split(' ').join('-');
}