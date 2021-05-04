import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginFormValues } from '../../interfaces';
import { formatApiErrors } from '../../utils/AxiosErrorFormatter';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const loginUser = createAsyncThunk<
	LoginResponse,
	LoginFormValues,
	{
		rejectValue: AsyncApiError;
	}
>('user/login', async (userDetails, thunkApi) => {
	try {
		const { data: userData } = await axios.post(`${apiURL}/login`, userDetails);
		console.log(userData, 'THE RESPONSE AFTER USER LOGIN');
		// setCookie('token', userData.token);
		Cookies.set('token', userData.token);
		return userData as LoginResponse;
	} catch (error) {
		console.log('THE ERROR CAUGHT FROM THE LOGIN USER API', error);
		// return thunkApi.rejectWithValue({ errorMessage: formatApiErrors(error) } as AsyncApiError);
		return thunkApi.rejectWithValue({ errorMessage: formatApiErrors(error) } as AsyncApiError);
	}
});

export const loginUserAsyncActions = (builder: ActionReducerMapBuilder<UserState>) => {
	builder.addCase(loginUser.pending, (state) => {
		state.status = 'pending';
	});
	builder.addCase(loginUser.fulfilled, (state, { payload }) => {
		const newMinutes = new Date().setMinutes(new Date().getMinutes() + 60);
		state.token = payload.token;
		state.loginTime = new Date().toDateString();
		state.sessionExpiry = newMinutes.toString();
		state.profile = {
			emailVerified: false,
			firstName: 'Shankara',
			lastName: 'Narayanan',
			lastLogin: new Date().toDateString(),
			userName: 'msShanky',
		};
		state.status = 'succeeded';
	});
	builder.addCase(loginUser.rejected, (state, action) => {
		if (action.payload) {
			state.error = action.payload.errorMessage;
			state.status = 'failed';
		} else {
			state.error = action.error?.message ?? JSON.stringify(action.error);
			state.status = 'failed';
		}
	});
};
