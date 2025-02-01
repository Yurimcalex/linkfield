import db from './db.js';


const api = {
	loadLinks: () => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(db.getLinks());
		}, 1000);
	}),

	createLink: (linkData) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(db.setLink(linkData));
		}, 1000);
	}),

	updateLink: (id, updatedData) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(db.updateLink(id, updatedData));
		}, 1000);
	}),

	deleteLink: (id) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(db.removeLink(id));
		}, 1000);
	})
};


export default api;