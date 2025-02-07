import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';


const userSlice = createSlice({
	name: 'user',

	initialState: {
		token: ''
	},

	reducers: {},

	extraReducers: builder => {
		.addCase(userLogged.pending, (state, action) => {
			state.status = 'loading';
		})
		.addCase(userLogged.fulfilled, (state, action) => {
			state.token = action.payload;
		});
	}
});


export default userSlice.reducer;


export const userLogged = createAsyncThunk('user/userLogged', (email, password) => {
	const response = await api.login(email, password);
	return response;
});