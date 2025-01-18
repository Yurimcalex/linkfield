import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
	name: 'filters',

	initialState: {
		categoryLink: {
			//[category]: [link type]
		}
	},

	reducers: {
		linkTypeSelected: (state, action) => {
			const { category, type } = action.payload;
			state.categoryLink[category] = type;
		}
	}
});

export default filtersSlice.reducer;


export const { linkTypeSelected } = filtersSlice.actions;