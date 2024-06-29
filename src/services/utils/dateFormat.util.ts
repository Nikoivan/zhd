import { FullDate } from '../calendar/getCalendarCells';

type InputValueType = {
	value: string;
	date: FullDate;
};

export function formatDateToInputValue(incomeValue: string, separator?: string): InputValueType {
	let formatValue = incomeValue.replace(separator || '/', '');
	if (formatValue.match(separator || '/')) {
		formatValue = formatValue.replace(separator || '/', '');
	}

	const date: FullDate = { date: null, month: null, year: null };

	if (formatValue.length === 1) {
		date.date = formatValue.slice(0, 1);
	}
	if (formatValue.length >= 2) {
		date.date = formatValue.slice(0, 2);
	}
	if (formatValue.length >= 3) {
		date.month = formatValue.slice(2, 3);
	}
	if (formatValue.length >= 4) {
		date.month = formatValue.slice(2, 4);
	}
	if (formatValue.length > 4) {
		date.year = `${formatValue.slice(4)}`;
	}

	return {
		value: `${date.date || ''}${date.month ? separator || '/' : ''}${date.month || ''}${
			date.year ? separator || '/' : ''
		}${date.year || ''}`,
		date,
	};
}

export function getTimeByDuration(value: number): string {
	const hours = Math.floor(value / 36000);
	const minutes = Math.round(value / 600) - hours * 60;

	return `${hours}:${minutes}`;
}

export function getFullTimeByDuration(value: number): [string, string] {
	const hours = Math.round(value / 36000);
	const minutes = Math.round(value / 600) - hours * 60;

	return [`${hours} часов`, `${minutes} минут`];
}

export function getValueDateByString(value: string): { value: string; date: FullDate | null } {
	const fullDate = { year: value.slice(0, 4), month: value.slice(5, 7), date: value.slice(8) };
	const { date, month, year } = fullDate;

	return { value: `${date}/${month}/${year}`, date: fullDate };
}

export function getFullDateWithDefaultFormat(value: string): { value: string; date: FullDate | null } {
	const date = {
		year: value.slice(6),
		month: value.slice(3, 5),
		date: value.slice(0, 2),
	};

	const { year, month, date: dates } = date;

	return {
		value: `${dates}/${month}/${year}`,
		date,
	};
}

export function getFullDateWithInputFormat(value: string): { value: string; date: FullDate | null } {
	const date = {
		year: value.slice(0, 4),
		month: value.slice(5, 7),
		date: value.slice(8),
	};

	const { year, month, date: dates } = date;

	return {
		value: `${dates}/${month}/${year}`,
		date,
	};
}
