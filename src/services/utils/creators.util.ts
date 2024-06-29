import { getFullDateWithDefaultFormat, getFullDateWithInputFormat } from './dateFormat.util';

export function createPagination(totalCount: number, limit: number | null) {
	const limitDublicate = limit || 5;
	const pagesCount = Math.ceil(totalCount / limitDublicate);

	const array = [];

	for (let i = 1; i <= pagesCount; i += 1) {
		array.push(i);
	}

	return array;
}

export function createValueDates(dateStart: string | null, dateEnd: string | null) {
	const startFunction = dateStart?.includes('-') ? getFullDateWithInputFormat : getFullDateWithDefaultFormat;
	const endFunction = dateEnd?.includes('-') ? getFullDateWithInputFormat : getFullDateWithDefaultFormat;

	return {
		date_start: dateStart ? startFunction(dateStart) : { value: '', date: null },
		date_end: dateEnd ? endFunction(dateEnd) : { value: '', date: null },
	};
}

export function createDocumentDataByInfo(data: string, type: 'passport' | 'certificate') {
	if (type === 'certificate') {
		return {
			serial: '',
			number: data,
		};
	}
	return {
		serial: data.length > 4 ? data.slice(0, 4) : data,
		number: data.length > 4 ? data.slice(4) : data,
	};
}
