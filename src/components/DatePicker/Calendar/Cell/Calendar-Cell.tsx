import { FC, PointerEvent } from 'react';
import { cn } from '@bem-react/classname';

import { Button } from '../../../Button/Button';
import { CellType, FullDate } from '../../../../services/calendar/getCalendarCells';

const cnCalendar = cn('Calendar');

type CalendarCellProps = CellType & {
	selected: boolean;
	onCellClick(e: PointerEvent<HTMLButtonElement>, fullDate: FullDate): void;
};

const CalendarCell: FC<CalendarCellProps> = ({ prop, fullDate, date, selected, onCellClick }) => (
	<td className={cnCalendar('Cell', { selected }, [prop || undefined])}>
		<Button
			onClick={(e: PointerEvent<HTMLButtonElement>) => {
				return onCellClick(e, fullDate);
			}}
			supraType='withoutAll'>
			{date}
		</Button>
	</td>
);

export default CalendarCell;
