import parseText from './parser.js';


const db = {
	links: null,

	createKey() {
		return `links-${Math.random().toFixed(10).slice(2)}`;
	},

	loadLinks() {
		return Object
			.keys(localStorage)
			.filter(key => key.startsWith('links'))
			.map(key => JSON.parse(localStorage.getItem(key)));
	},

	setLink(linkData) {
		const key = this.createKey();
		const data = { ...linkData, _id: key };
		localStorage.setItem(key, JSON.stringify(data));
		return data;
	},

	updateLink(id, linkData) {
		const data = { ...linkData, _id: id };
		localStorage.setItem(id, JSON.stringify(data));
		return data;
	},

	removeLink(id) {
		localStorage.removeItem(id);
		return id;
	},

	getLinks() {
		return this.links;
	},

	init() {
		this.links = this.loadLinks();
	}
};

db.init();


initiateDB();

async function initiateDB() {
	const text = await readText('initialLinkList.txt');
	const links = parseText(text).getLinks();
	if (!localStorage.length) {
		links.forEach(link => db.setLink(link));
	}
}


async function readText(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}


export default db;