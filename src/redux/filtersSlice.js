import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
	name: 'filters',

	initialState: {
		categoryLink: {
			//[category]: [link type]
		}
	},

	reducers: {}
});

export default filtersSlice.reducer;

