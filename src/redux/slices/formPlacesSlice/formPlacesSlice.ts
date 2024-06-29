import { createSlice } from '@reduxjs/toolkit';
import {
	ChangeSearchValueAction,
	FailureAction,
	SelectPlaceAction,
	SelectPlaceItemAction,
	SetErrorAction,
	SetRequestValueAction,
	SuccessAction,
} from '../../actions/formPlaces.actionsTypes';

export type PlaceListItemProps = { _id: string; name: string };

export type FieldNames = 'selectedPlaceTo' | 'selectedPlaceFrom';

type PlacesState = {
	searchValues: { selectedPlaceTo: string; selectedPlaceFrom: string };
	activeSearchField: FieldNames | null;
	requestValue: string | null;
	success: PlaceListItemProps[] | null;
	error: string | null;
	selectedPlaceFrom: PlaceListItemProps | null;
	selectedPlaceTo: PlaceListItemProps | null;
	placesList: PlaceListItemProps[];
	errors: {
		selectedPlaceFrom: boolean;
		selectedPlaceTo: boolean;
	};
};

const initalErrors = { selectedPlaceFrom: false, selectedPlaceTo: false };

const initialState: PlacesState = {
	searchValues: { selectedPlaceTo: '', selectedPlaceFrom: '' },
	activeSearchField: null,
	requestValue: null,
	success: null,
	error: null,
	selectedPlaceTo: null,
	selectedPlaceFrom: null,
	placesList: [],
	errors: initalErrors,
};

export const formPlacesSlice = createSlice({
	name: 'formPlaces',
	initialState,
	reducers: {
		changeSearchValue: (state, action: ChangeSearchValueAction) => {
			const { fieldName, value } = action.payload;

			state.searchValues[fieldName] = value;
			state.activeSearchField = fieldName;
			state.errors = initalErrors;

			if (state.errors[fieldName]) {
				state.errors[fieldName] = false;
			}
		},
		onSelect: (state, action: SelectPlaceItemAction) => {
			const { listItem } = action.payload;

			if (!state.activeSearchField) {
				return;
			}

			state.searchValues[state.activeSearchField] = listItem.name;
			state[state.activeSearchField] = listItem;
			state.requestValue = null;
			state.activeSearchField = null;
			state.success = null;
			state.error = null;
			state.placesList = [];
		},
		onClose: (state) => {
			state.requestValue = null;
			state.activeSearchField = null;
			state.success = null;
			state.error = null;
			state.placesList = [];
		},
		swapPlaces: (state) => {
			const cloneSearchValues = { ...state.searchValues };
			state.searchValues.selectedPlaceFrom = cloneSearchValues.selectedPlaceTo;
			state.searchValues.selectedPlaceTo = cloneSearchValues.selectedPlaceFrom;
		},
		setRequestValue: (state, action: SetRequestValueAction) => {
			state.requestValue = action.payload.requestValue;
		},
		requestSuccess: (state, action: SuccessAction) => {
			state.placesList = action.payload.success;
		},
		requestFailure: (state, action: FailureAction) => {
			state.error = action.payload.error;
		},
		selectPlace: (state, action: SelectPlaceAction) => {
			const { directName, selectedPlace } = action.payload;

			state[directName] = selectedPlace;
		},
		setError: (state, action: SetErrorAction) => {
			const { fieldName, isError } = action.payload;

			state.errors[fieldName] = isError;
		},
	},
});

export const formPlacesActions = formPlacesSlice.actions;

export type FormPlacesActionsTypes = typeof formPlacesSlice.actions;
