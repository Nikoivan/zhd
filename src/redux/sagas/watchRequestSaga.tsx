import { put, retry, takeLatest } from 'redux-saga/effects';

import { getCitiesRequesUrl } from '../../services/utils/url.util';

import { PlaceListItemProps, formPlacesActions } from '../slices/formPlacesSlice/formPlacesSlice';
import { SetRequestValueAction } from '../actions/formPlaces.actionsTypes';
import requestAPI from '../../services/API/requestAPI';

function filterPlacesRequestAction(action: { type: string; payload?: Record<string, string> }): boolean {
	return (
		action.type === formPlacesActions.setRequestValue.type &&
		!!action.payload?.requestValue &&
		action.payload.requestValue.trim() !== ''
	);
}

function* handlerRequestSaga(action: SetRequestValueAction) {
	const { requestValue } = action.payload;

	const url = getCitiesRequesUrl(requestValue);

	try {
		const data: PlaceListItemProps[] = yield retry(3, 1000, requestAPI, { url });
		// const data: PlaceListItemProps[] = yield retry(3, 1000, mockCities, { url });
		yield put(formPlacesActions.requestSuccess({ success: data }));
	} catch (e) {
		yield put(formPlacesActions.requestFailure({ error: 'Ошибка при ответе сервера, попробуйте снова' }));
	}
}

export default function* watchSearchPlacesRequest() {
	yield takeLatest(filterPlacesRequestAction, handlerRequestSaga);
}
