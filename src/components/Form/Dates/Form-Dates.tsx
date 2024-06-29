import { ChangeEvent, PointerEvent, FC, useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Popover, Typography } from '@mui/material';

import dateIconUrl from '../../../assets/icons/date.svg';

import { createValueDates } from '../../../services/utils/creators.util';
import { AnchorPositionProps, CalendarOpenScope, DateValues } from '../../../types/types';
import inputDateValidation from '../../../services/validators/inputDateValidation';
import { formatDateToInputValue } from '../../../services/utils/dateFormat.util';
import { FullDate } from '../../../services/calendar/getCalendarCells';
import FormDateItem from '../DateItem/Form-DateItem';

type FormDatesProps = {
	dateStart: string | null;
	dateEnd: string | null;
	isDefaultTitles?: boolean;
	titleStyles?: Record<string, string | number>;
	inputStyles?: Record<string, string | number>;
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const calendarInitialScope = {
	isOpen: false,
	scope: null,
};

const cnForm = cn('Form');

const FormDates: FC<FormDatesProps> = ({
	dateStart,
	dateEnd,
	isDefaultTitles,
	titleStyles,
	inputStyles,
	onChange: onChangeInvoke,
}) => {
	const [calendarScope, setCalendarScope] = useState<CalendarOpenScope>(calendarInitialScope);
	const [valueDates, setValueDates] = useState<DateValues>(createValueDates(dateStart, dateEnd));
	const [popOverValue, setPopOverValue] = useState<string | null>(null);
	const [anchorPosition, setAnchorPosition] = useState<AnchorPositionProps | null>(null);

	const openCalendar = useCallback((valueName: 'date_start' | 'date_end') => {
		setCalendarScope({ isOpen: true, scope: valueName });
	}, []);

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;

			if (inputDateValidation(value)) {
				setValueDates((prev) => ({ ...prev, [name]: formatDateToInputValue(value) }));
			}

			if (value === '' || value.length === 10) {
				onChangeInvoke(name, value);
			}
		},
		[onChangeInvoke]
	);

	const clearPopover = useCallback(() => {
		setPopOverValue(null);
	}, []);

	const onCellClick = useCallback(
		(e: PointerEvent<HTMLButtonElement>, fullDate: FullDate) => {
			setAnchorPosition({ top: e.pageY, left: e.pageX });
			if (!calendarScope.scope) {
				return;
			}

			const newValue = {
				[calendarScope.scope]: { value: `${fullDate.date}/${fullDate.month}/${fullDate.year}`, date: fullDate },
			};

			const valueName = calendarScope.scope;
			const value = `${fullDate.year}-${fullDate.month}-${fullDate.date}`;

			onChangeInvoke(valueName, value);

			setValueDates((prev) => ({ ...prev, ...newValue }));

			setCalendarScope(calendarInitialScope);
		},
		[calendarScope.scope, onChangeInvoke]
	);

	const onClose = useCallback(() => {
		setCalendarScope(calendarInitialScope);
	}, []);

	return (
		<>
			{calendarScope.isOpen && anchorPosition && !!popOverValue && (
				<Popover
					className={cnForm('Popover')}
					open={!!popOverValue}
					anchorPosition={anchorPosition}
					anchorReference='anchorPosition'
					onClose={clearPopover}>
					<Typography sx={{ color: 'red', p: 1, fontSize: '20px' }}>{popOverValue}</Typography>
				</Popover>
			)}
			{isDefaultTitles && (
				<span
					className={cnForm('ItemTitle')}
					style={titleStyles}>
					Дата поездки
				</span>
			)}
			<FormDateItem
				value={valueDates.date_start.value}
				activeDate={dateStart}
				name='date_start'
				openCalendar={openCalendar}
				scope={calendarScope.scope}
				isOpen={calendarScope.isOpen}
				dateIconUrl={dateIconUrl}
				onChange={onChange}
				inputStyles={inputStyles}
				onCellClick={onCellClick}
				onClickOutside={onClose}
			/>
			{isDefaultTitles && (
				<span
					className={cnForm('ItemTitle')}
					style={titleStyles}>
					Дата возвращения
				</span>
			)}
			<FormDateItem
				value={valueDates.date_end.value}
				activeDate={dateEnd}
				name='date_end'
				openCalendar={openCalendar}
				scope={calendarScope.scope}
				isOpen={calendarScope.isOpen}
				dateIconUrl={dateIconUrl}
				onChange={onChange}
				inputStyles={inputStyles}
				onCellClick={onCellClick}
				onClickOutside={onClose}
			/>
		</>
	);
};

export default FormDates;
