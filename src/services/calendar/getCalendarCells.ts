import moment from 'moment';

export type FullDate = {
	year: string | null;
	month: string | null;
	date: string | null;
};

export type CellType = {
	date: string;
	prop: null | string;
	fullDate: FullDate;
};

function getFirstMonday(date: Date): moment.Moment {
	if (moment(date).weekday() === 1) {
		return moment(date);
	}

	if (moment(date).weekday() === 0) {
		return moment(date).day(-6);
	}

	return moment(date).weekday(1);
}

function getLastSunday(date: Date): moment.Moment {
	const end = moment(date).endOf('month');
	if (end.weekday() === 0) {
		return end;
	}

	return end.day(7);
}

function getCell(currentDate: moment.Moment, date: Date) {
	return {
		fullDate: { year: currentDate.format('YYYY'), month: currentDate.format('MM'), date: currentDate.format('DD') },
		date: currentDate.format('D'),
		prop: currentDate.format('MM') === moment(date).format('MM') ? null : ' Calendar-OtherMonth',
	};
}

export default function getNewArr(date: Date): CellType[][] {
	const amountCells = [];

	const lastSunday = getLastSunday(date);
	let currentDate = getFirstMonday(date);

	while (
		!(currentDate.format('MM') === lastSunday.format('MM') && currentDate.format('DD') === lastSunday.format('DD'))
	) {
		amountCells.push(getCell(currentDate, date));
		currentDate = currentDate.add(1, 'day');
	}

	amountCells.push(getCell(lastSunday, date));

	const weeksCount = amountCells.length / 7;
	const weeks = [];
	let index = 0;

	for (let i = 0; i < weeksCount; i += 1) {
		const week = [];
		for (let q = 0; q < 7; q += 1) {
			week.push(amountCells[index]);
			index += 1;
		}
		weeks.push(week);
	}
	return weeks;
}
