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


export default db;