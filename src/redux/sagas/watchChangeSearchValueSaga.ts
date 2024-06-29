import { debounce, put } from 'redux-saga/effects';
import { ChangeSearchValueAction } from '../actions/formPlaces.actionsTypes';
import { formPlacesActions } from '../slices/formPlacesSlice/formPlacesSlice';

function filterChangeCityNameAction(action: { type: string; payload?: Record<string, string> }): boolean {
	return action.type === formPlacesActions.changeSearchValue.type && action.payload?.value.trim() !== '';
}

function* handleChangeCityName(action: ChangeSearchValueAction) {
	yield put(formPlacesActions.setRequestValue({ requestValue: action.payload.value }));
}

export default function* watchChangeSearchPlacesValue() {
	yield debounce(500, filterChangeCityNameAction, handleChangeCityName);
}
