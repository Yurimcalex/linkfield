export function createLink(data) {
	document
		.querySelector(`ul[data-category="${data.category}"]`)
		.innerHTML += createLinkItem(data);
}


export function createLinkItem(data) {
	let html = '';
	html += '<li class="link-list-item">';
		html += '<h3>';
			html += `<span class="link-type">${data.type}</span> `;
			html += `<a class="link-topic" href=${data.link} target="_blank">${data.topic}</a>`;
			html += '<div class="link-controls visibility sm">';
				html += `<span><a class="link-btn edit-btn">&#128393;</a></span>`;
				html += '<span><a class="link-btn remove-btn">&#128473;</a></span>';
			html += '</div>';
		html += '</h3>';
	html += '</li>';
	return html;
}