import { FC } from 'react';

import getNewArr from '../../../services/calendar/getCalendarCells';
import CalendarCell from './Cell/Calendar-Cell';

import './Calendar.scss';

export type CalendarFieldProps = {
	activeDate: string | null;

	date: Date;
	onCellClick(): void;
};

const Calendar: FC<CalendarFieldProps> = ({ activeDate, date, onCellClick }) => {
	const calendarArr = getNewArr(date);

	return (
		<table className='Calendar'>
			<tbody>
				{calendarArr.map((el, idx) => (
					<tr key={idx}>
						{el.map((item, id) => (
							<CalendarCell
								key={id}
								selected={!!activeDate && activeDate === `${item.fullDate.date}/${item.fullDate.month}/${item.fullDate.year}`}
								onCellClick={onCellClick}
								{...item}
							/>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Calendar;
