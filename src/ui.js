export default function createUI(data) {
  let html = '';
  for (let d of data) {
    html += '<div>';
    html += `<h2>${d.title}</h2>`;
    for (let link of d.links) {
      html += '<ul>';
      html += `<h3><a href=${link.link} target="_blank">${link.topic}</a></h3>`;
      html += '</ul>';
    }
    html += '</div>';
  }

  return html;
}