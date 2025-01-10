const select = document.querySelector('.link-creator select[name="category"]');

export function createCategorySelectContent(data) {
	select.innerHTML = createOptions(data);
}


function createOptions(data) {
	let html = '';
	for (let d of data) {
		html += `<option value="${d}">${d}</option>`
	}
	return html;
}