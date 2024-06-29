import { createSlice } from '@reduxjs/toolkit';

type SearchState = {
	searchValue: string;
	searchRequest: string;
};

const initialState: SearchState = {
	searchValue: '',
	searchRequest: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeSearchValue: (state, action) => {
			state.searchValue = action.payload.searchValue;
		},
		sendSearchRequest: (state, action) => {
			state.searchRequest = action.payload.searchRequest;
		},
	},
});

export const { changeSearchValue, sendSearchRequest } = searchSlice.actions;

export type AllSearchActions = typeof searchSlice.actions;
