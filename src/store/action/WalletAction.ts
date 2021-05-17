import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { formatApiErrors } from '../../utils/AxiosErrorFormatter';
// import { BaseAsyncActionFactory } from '../../utils/ReduxAsyncAction';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const createWallet = createAsyncThunk<Wallet, WalletFormValues, ApiErrorType>(
	'wallets/create',
	async (walletBody, thunkApi) => {
		try {
			const response = await axios.post(`${apiURL}/wallets`, walletBody);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue({ ...formatApiErrors(error) });
		}
	}
);

export const getWallets = createAsyncThunk<Array<Wallet>, void, ApiErrorType>('wallets/get', async (_, thunkApi) => {
	try {
		const response = await axios.get(`${apiURL}/wallets`);
		return response.data;
	} catch (error) {
		return thunkApi.rejectWithValue({ ...formatApiErrors(error) });
	}
});

export const getWalletAsyncActions = (builder: ActionReducerMapBuilder<WalletState>) => {
	builder.addCase(getWallets.pending, (state) => {
		state.status = 'pending';
	});
	builder.addCase(getWallets.fulfilled, (state, { payload }) => {
		state.wallets = payload;
		state.status = 'succeeded';
	});
	builder.addCase(getWallets.rejected, (state, action) => {
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

export const createWalletAsyncActions = (builder: ActionReducerMapBuilder<WalletState>) => {
	builder.addCase(createWallet.pending, (state) => {
		state.status = 'pending';
	});
	builder.addCase(createWallet.fulfilled, (state, { payload }) => {
		state.wallets = [...state.wallets, payload];
		state.status = 'succeeded';
	});
	builder.addCase(createWallet.rejected, (state, action) => {
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
