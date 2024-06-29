import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { formPlacesSlice } from '../redux/slices/formPlacesSlice/formPlacesSlice';
import { searchSlice } from '../redux/slices/searchSlice/searchSlice';
import { ticketDataSlice } from '../redux/slices/ticketSlice/ticketSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineSlices(formPlacesSlice, searchSlice, ticketDataSlice);

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
