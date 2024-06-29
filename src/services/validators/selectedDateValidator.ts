import { FullDate } from '../calendar/getCalendarCells';

export default function selectedDateValidation({ date, month, year }: FullDate): boolean {
	const dateTimestamp = new Date(`${month}-${date}-${year}`).getTime();
	const currentTimestamp = new Date().getTime();

	return dateTimestamp > currentTimestamp;
}

export function selectedReturnDateValidation(
	{ date: selectedDate, month: selectedMonth, year: selectedYear }: FullDate,
	{ date: checkDate, month: checkDateMonth, year: checkDateYear }: FullDate
): boolean {
	const cur = new Date(`${selectedMonth}-${selectedDate}-${selectedYear}`).getTime();

	const check = new Date(`${checkDateMonth}-${checkDate}-${checkDateYear}`).getTime();

	return cur >= check;
}
