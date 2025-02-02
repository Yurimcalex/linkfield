import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fakeApi from '../fakeApi/api.js';

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
	},

	extraReducers: builder => {
		builder
			.addCase(linkRemoved.pending, (state, action) => {
				state.status = 'loading';
			})	
			.addCase(linkRemoved.fulfilled, (state, action) => {
				const id = action.payload;
				const ind = state.data.findIndex(d => d._id == id);
				state.removedLinkCategory = state.data[ind].category;
				state.data.splice(ind, 1);
				state.removedId = id;
				state.status = 'idle';
			})
			.addCase(linkCreated.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(linkCreated.fulfilled, (state, action) => {
				state.data.push({ ...action.payload });
				state.createdId = action.payload._id;
				state.status = 'idle';
			});
	}
});

export default linksSlice.reducer;


// async actions
export const linkRemoved = createAsyncThunk('links/linkRemoved', async (id) => {
	const response = await fakeApi.deleteLink(id);
	return response;
});

export const linkCreated = createAsyncThunk('links/linkCreated', async (linkData) => {
	const response = await fakeApi.createLink(linkData);
	return response;
});


// actions
export const { linkEdited, editedLinkIdSelected } = linksSlice.actions;


// selectors
export const selectCreatedLink = (state) => {
	return state.links.data.find(d => d._id == state.links.createdId);
};
export const selectCreatedLinkId = (state) => state.links.createdId;


export const selectLinkForEdit = (state) => {
	return state.links.data.find(d => d._id == state.links.editedId);
};
export const selectEditedLinkId = (state) => state.links.editedId;
export const selectEditedLink = (state) => state.links.editedLink;


export const selectCountLinksByCategory = (state) => {
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


export const selectLinkCategories = (state) => 
	Array.from(
		new Set(
			state.links.data.map(d => d.category)
		)
	);
export const selectLinksByCategory = (state, category) =>
	state.links.data.filter(link => link.category === category);



export const selectLinkTypes = (state) => 
	Array.from(
		new Set(
			state.links.data.map(d => d.type)
		)
	);
export const selectLinkTypesByCategory = (state, category) => {
	const links = selectLinksByCategory(state, category);
	return Array.from(
		new Set(
			links.map(link => link.type)
		)
	);
};


export const selectRemovedLinkId = (state) => state.links.removedId;
export const selectRemovedLinkCategory = (state) => state.links.removedLinkCategory;


export const selectLoadingStatus = (state) => state.links.status;