import { spawn } from 'redux-saga/effects';
import watchChangeSearchPlacesValue from './watchChangeSearchValueSaga';
import watchSearchPlacesRequest from './watchRequestSaga';

export default function* rootSaga() {
	yield spawn(watchChangeSearchPlacesValue);
	yield spawn(watchSearchPlacesRequest);
}
