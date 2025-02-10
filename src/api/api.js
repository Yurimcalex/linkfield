const baseUrl = 'http://localhost:5050';

const api = {
	loadLinks: async (token) => {
		let result = await fetch(`${baseUrl}/links`, {
			method: 'GET',
			headers: {
				"x-access-token": token
			}
		});
		return await result.json();
	},

	createLink: async (linkData) => {
		const response = await fetch(`${baseUrl}/links`, {
			method: 'POST',
			headers: {
			  "content-type": "application/json"
			},
			body: JSON.stringify(linkData)
		});
		const result = await response.json();
		return { ...linkData, _id: result.insertedId };
	},

	updateLink: async (id, updatedData) => {
		const response = await fetch(`${baseUrl}/links/${id}`, {
			method: 'PATCH',
			headers: {
			  "content-type": "application/json"
			},
			body: JSON.stringify(updatedData)
		});
		const result = await response.json();
		return { ...updatedData, _id: id };
	},

	deleteLink: async (id) => {
		const response = await fetch(`${baseUrl}/links/${id}`, {
			method: 'DELETE'
		});
		const result = await response.json();
		return id;
	},

	login: async (email, password) => {
		const response = await fetch(`${baseUrl}/login`, {
			method: 'POST',
			headers: {
			  "content-type": "application/json"
			},
			body: JSON.stringify({ email, password })
		});
		const result = await response.json();
		return result.token;
	}
};

export default api;