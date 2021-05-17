import {
	ActionReducerMapBuilder,
	AnyAction,
	AsyncThunk,
	AsyncThunkPayloadCreator,
	createReducer,
	PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import initialState from '../store/initialState';

// import { RootState } from '../store';

// export const BaseAsyncActionFactory = <StateType, Returned, ThunkArg, ThunkApiConfig>(
// 	builder: ActionReducerMapBuilder<StateType>,
// 	stateField: string,
// 	thunk: typeof
// ) => {
// 	builder.addCase(thunk.pending, (state) => {
// 		(state as WalletState).status = 'pending';
// 	});
// 	builder.addCase(thunk.fulfilled, (state, { payload }) => {
// 		state[`${stateField}`] = payload;
// 		state.status = 'succeeded';
// 	});
// 	builder.addCase(thunk.rejected, (state, action) => {
// 		// console.log('The error case for api assignment is', action.payload);
// 		// console.log('the error from action is', action.error);
// 		if (action.payload) {
// 			console.log('THERE IS PAYLOAD FOR THE ERROR', action.payload.error);
// 			state.error = action.payload.error;
// 			state.status = 'failed';
// 		} else {
// 			// state.error = action.error?.message ?? JSON.stringify(action.error);
// 			state.error = {
// 				message: action.error.message as string,
// 				name: action.error.name as string,
// 				statusCode: parseInt(action.error.code as string, 10),
// 			};
// 			state.status = 'failed';
// 		}
// 	});
// };
