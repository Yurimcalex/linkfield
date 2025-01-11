import { getFormData } from './displayCreatedLink.js';
import { replaceSpace } from '../../utils.js';

const openBtn = document.querySelector('.link-creator-opener');
const form = document.querySelector('.link-creator form');
const content = document.querySelector('.content');

export function handleLinkEdit() {
	content.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('edit-btn')) {
			editData(target);
		}
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
function editData(link) {
	const { linkItem, list, position, category } = getLinkInfo(link);
		
		openBtn.click();
		putDataIntoForm(linkItem);
		changeFormButtonText('Edit');
		
		form.add.addEventListener('click', function interceptAddBtnclick() {
			const { category: newCategory } = getFormData(form);
			const oldLink = list.children[position];
			
			if (category === newCategory) {	
				replaceLinkWithEditedOne(list, position);
			} else {
				focusOnLink(newCategory);
			}
			oldLink.remove();
			changeFormButtonText('Add');
			
			form.add.removeEventListener('click', interceptAddBtnclick);
		});
	
}


function getLinkInfo(link) {
	const li = link.closest('li');
	const list = li.closest('.link-list');
	return {
		linkItem: li,
		list,
		category: list.dataset.category,
		position:  Array.from(list.children).indexOf(li)
	};
}


function putDataIntoForm(linkItem) {
	const list = linkItem.closest('.link-list');
	const linkType = linkItem.querySelector('.link-type');
	const linkTopic = linkItem.querySelector('.link-topic');
	const linkList = linkItem.closest('.link-list');

	form.link.value = linkTopic.getAttribute('href');
	form.topic.value = linkTopic.textContent;
	form.type.value = replaceSpace(linkType.textContent);
	form.category.value = linkList.dataset.category;
}


function changeFormButtonText(newText) {
	form.add.textContent = newText;
}


function replaceLinkWithEditedOne(linkList, linkInd) {
	const oldLink = linkList.children[linkInd];
	const newLink = linkList.querySelector('li:last-child');
	oldLink.after(newLink);
	newLink.click();
}


function focusOnLink(category) {
	const listItems = content.querySelector(`ul[data-category="${category}"]`).children;
	const link = listItems[listItems.length - 1];
	
	if (!isVisible(link)) {
		link.scrollIntoView(false);
		window.scrollBy(0, 20);
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