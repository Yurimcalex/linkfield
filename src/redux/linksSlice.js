import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice({
	name: 'links',

	initialState: {
		data: [
			{
				category: "HTML & CSS",
				src: "https://www.joshwcomeau.com/css/transforms/",
				description: "The World of CSS Transforms",
				type: "guide"
			}
		]
	},

	reducers: {
		linkRemoved: (state, action) => {
			const id = action.payload;
			const ind = state.data.findIndex(d => d._id == id);
			state.removedId = id;
			state.removedLinkCategory = state.data[ind].category;
			state.data.splice(ind, 1);
		},

		linkCreated: (state, action) => {
			state.data.push({ ...action.payload });
			state.createdId = action.payload._id;
		},

		editedLinkIdSelected: (state, action) => {
			state.editedId = action.payload;
		},

		linkEdited: (state, action) => {
			const { _id, src, type, description, category } = action.payload; 
			const item = state.data.find(d => d._id == _id);
			item.src = src;
			item.type = type;
			item.description = description;
			item.category = category;
			state.editedLink = { ...action.payload };
		}
	}
});

export default linksSlice.reducer;


// actions
export const { linkRemoved, linkCreated, linkEdited, editedLinkIdSelected } = linksSlice.actions;


// selectors
export const selectAllLinks = (state) => state.links.data;

export const selectLinkById = (state, id) => state.links.data.find(d => d._id == id);

export const selectJustCreatedLink = (state) => {
	return state.links.data.find(d => d._id == state.links.createdId);
};

export const selectEditingLink = (state) => {
	return state.links.data.find(d => d._id == state.links.editedId);
};

export const selectEditedLink = (state) => state.links.editedLink;

export const selectAllLinksId = (state) => state.links.data.map(d => d._id);

export const selectCategoryData = (state) => {
	let result = [];
	const data = {};
	state.links.data.forEach(({ category }) => {
		if (!(category in data)) {
			data[category] = 1;
		} else {
			data[category] += 1;
		}
	});
	return data;
};

export const selectCategoryNames = (state) => 
	Array.from(
		new Set(
			state.links.data.map(d => d.category)
		)
	);

export const selectLinkTypes = (state) => 
	Array.from(
		new Set(
			state.links.data.map(d => d.type)
		)
	);

export const selectLinksByCategory = (state, category) =>
	state.links.data.filter(link => link.category === category);

export const selectLinkTypesByCategory = (state, category) => {
	const links = selectLinksByCategory(state, category);
	return Array.from(
		new Set(
			links.map(link => link.type)
		)
	);
};

export const selectRemovedLinkId = (state) => state.links.removedId;

export const selectCreatedLinkId = (state) => state.links.createdId;

export const selectEditedLinkId = (state) => state.links.editedId;

export const selectRemovedLinkCategory = (state) => state.links.removedLinkCategory;