import { createAsyncThunk } from '@reduxjs/toolkit';
import { DirectionsRequestResult } from '../slices/ticketSlice/ticketsSliceTypes';

const directionsError = new Error('Ошибка при запросе направлений');

export const fetchToDirections = createAsyncThunk('ticketData/startLoading', async function (url: string): Promise<{
	data: DirectionsRequestResult;
}> {
	try {
		const response = await fetch(url);

		if (response.status >= 300) {
			throw directionsError;
		}

		return { data: await response.json() };
	} catch {
		throw directionsError;
	}
});
