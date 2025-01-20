import { createSlice } from '@reduxjs/toolkit';

const linksSlice = createSlice({
	name: 'links',

	initialState: {
		data: [
			{
				category: "HTML & CSS",
				link: "https://www.joshwcomeau.com/css/transforms/",
				topic: "The World of CSS Transforms",
				type: "guide"
			}
		]
	},

	reducers: {
		linkRemoved: (state, action) => {
			const id = action.payload;
			const ind = state.data.findIndex(d => d.id == id);
			state.data.splice(ind, 1);
			state.removedId = id;
		}
	}
});

export default linksSlice.reducer;


// actions
export const { linkRemoved } = linksSlice.actions;


// selectors
export const selectAllLinks = (state) => state.links.data;

export const selectAllLinksId = (state) => state.links.data.map(d => d.id);

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