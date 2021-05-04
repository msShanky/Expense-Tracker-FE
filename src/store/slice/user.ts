import { createSlice } from '@reduxjs/toolkit';
import { loginUserAsyncActions } from '../action/UserFetch';
import initialState from '../initialState';

const userSlice = createSlice({
	name: 'user',
	initialState: initialState.user,
	reducers: {
		setUser: (state, payload) => {
			state.profile = payload;
			state.loginTime = new Date().toDateString();
		},
	},
	extraReducers: (builder) => {
		loginUserAsyncActions(builder);
	},
});

export default userSlice.reducer;
