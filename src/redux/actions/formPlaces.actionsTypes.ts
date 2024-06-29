import { PayloadAction } from '@reduxjs/toolkit';
import { FieldNames, PlaceListItemProps } from '../slices/formPlacesSlice/formPlacesSlice';

export type SelectPlaceAction = PayloadAction<{
	directName: FieldNames;
	selectedPlace: PlaceListItemProps;
}>;

export type SetPlacesListAction = PayloadAction<{ placesList: PlaceListItemProps[] }>;
export type ChangeSearchValueAction = PayloadAction<{
	fieldName: FieldNames;
	value: string;
}>;
export type SelectPlaceItemAction = PayloadAction<{
	listItem: PlaceListItemProps;
}>;
export type SetSearchFieldAction = PayloadAction<{ fieldName: FieldNames }>;
export type SetRequestValueAction = PayloadAction<{ requestValue: string }>;
export type SuccessAction = PayloadAction<{ success: PlaceListItemProps[] }>;
export type FailureAction = PayloadAction<{ error: string }>;
export type SetErrorAction = PayloadAction<{ fieldName: FieldNames; isError: boolean }>;
