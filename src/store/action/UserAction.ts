import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { formatApiErrors } from '../../utils/AxiosErrorFormatter';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const loginUser = createAsyncThunk<LoginResponse, LoginFormValues, ApiErrorType>(
	'user/login',
	async (userDetails, thunkApi) => {
		try {
			const { data: userData } = await axios.post(`${apiURL}/login`, userDetails);
			Cookies.set('token', userData.token);
			return userData as LoginResponse;
		} catch (error) {
			return thunkApi.rejectWithValue({
				...formatApiErrors(error),
			});
		}
	}
);

export const registerUser = createAsyncThunk<RegistrationResponse, RegisterFormValues, ApiErrorType>(
	'user/register',
	async (registrationDetails, thunkApi) => {
		try {
			const { data: userData } = await axios.post(`${apiURL}/register`, registrationDetails);
			Cookies.set('token', userData.token);
			return userData as RegistrationResponse;
		} catch (error) {
			console.log('THERE IS AN ERROR WHEN THE USER TRIED TO REGISTER', error);
			return thunkApi.rejectWithValue({
				...formatApiErrors(error),
			} as ServerApiError);
		}
	}
);

export const loginUserAsyncActions = (builder: ActionReducerMapBuilder<UserState>) => {
	builder.addCase(loginUser.pending, (state) => {
		state.status = 'pending';		
	});
	builder.addCase(loginUser.fulfilled, (state, { payload }) => {
		state.profile = payload;
		state.status = 'succeeded';
	});
	builder.addCase(loginUser.rejected, (state, action) => {
		// console.log('The error case for api assignment is', action.payload);
		// console.log('the error from action is', action.error);
		if (action.payload) {
			console.log('THERE IS PAYLOAD FOR THE ERROR', action.payload.error);
			state.error = action.payload.error;
			state.status = 'failed';
		} else {
			// state.error = action.error?.message ?? JSON.stringify(action.error);
			state.error = {
				message: action.error.message as string,
				name: action.error.name as string,
				statusCode: parseInt(action.error.code as string, 10),
			};
			state.status = 'failed';
		}
	});
};

export const registerUserActions = (builder: ActionReducerMapBuilder<UserState>) => {
	builder.addCase(registerUser.pending, (state) => {
		state.status = 'pending';
	});
	builder.addCase(registerUser.fulfilled, (state, { payload }) => {
		state.status = 'succeeded';
		state.profile = payload;
	});
	builder.addCase(registerUser.rejected, (state, action) => {
		// console.log('The error case for api assignment is', action.payload);
		// console.log('the error from action is', action.error);
		if (action.payload) {
			console.log('THERE IS PAYLOAD FOR THE ERROR', action.payload.error);
			state.error = action.payload.error;
			state.status = 'failed';
		} else {
			// state.error = action.error?.message ?? JSON.stringify(action.error);
			state.error = {
				message: action.error.message as string,
				name: action.error.name as string,
				statusCode: parseInt(action.error.code as string, 10),
			};
			state.status = 'failed';
		}
	});
};
