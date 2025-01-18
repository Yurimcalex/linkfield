import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
	name: 'filters',

	initialState: {
		linkType: {
			category: '',
			type: ''
		}
	},

	reducers: {
		linkTypeSelected: (state, action) => {
			state.linkType = { ...action.payload };
		}
	}
});

export default filtersSlice.reducer;

// actions 
export const { linkTypeSelected } = filtersSlice.actions;


// selectors
export const selectLinkType = (state, category) => state.filters.linkType;