import { createSlice } from '@reduxjs/toolkit';

const actionSlice = createSlice({
	name: 'action',

	initialState: {
		action: ''	
	},

	reducers: {
		actionHappened: (state, action) => {
			state.action = action.payload;
		}
	}
});

export default actionSlice.reducer;

// actions 
export const { actionHappened } = actionSlice.actions;

// selectors
export const selectAction = (state) => state.action.action; 