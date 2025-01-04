export default function createUI(data) {
  let html = '';
  for (let d of data) {
    html += '<div>';
    html += `<h2>${d.title}</h2>`;
    html += createCategoryUL(d.links);
    html += '</div>';
  }

  return html;
}


function createCategoryUL(links) {
	let html = '';
	html += '<ul>';
	for (let link of links) {
		html += '<li>';
		html += `<h3><a href=${link.link} target="_blank">${link.topic}</a></h3>`;
		html += '</li>';
	}
	html += '</ul>';
	return html;
}