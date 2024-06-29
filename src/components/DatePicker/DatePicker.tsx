import { FC, useCallback, useState, PointerEvent, useRef } from 'react';
import { IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import useClickOutside from '../../hooks/useClickOutside';
import { FullDate } from '../../services/calendar/getCalendarCells';
import Calendar from './Calendar/Calendar';

import './DatePicker.scss';

type DatePickerProps = {
	activeDate: string | null;
	onCellClick(e?: PointerEvent<HTMLButtonElement>, fullDate?: FullDate): void;
	onClickOutside(): void;
};

const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const getDate = () => {
	const date = new Date();
	return new Date(date.setDate(1));
};

const DatePicker: FC<DatePickerProps> = ({ activeDate, onCellClick, onClickOutside }) => {
	const [currentMonth, setCurrentMonth] = useState<Date>(getDate());
	const ref = useRef(null);
	useClickOutside(ref, onClickOutside);

	const nextMonth = useCallback(() => {
		const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));

		setCurrentMonth(new Date(newDate));
	}, [currentMonth]);

	const previousMonth = useCallback(() => {
		const newDate = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));

		setCurrentMonth(new Date(newDate));
	}, [currentMonth]);

	return (
		<div
			className='DatePicker'
			ref={ref}>
			<div className='DatePicker-Header'>
				<IconButton
					onClick={previousMonth}
					className='DatePicker-Previous'>
					<ArrowLeft />
				</IconButton>
				<span className='DatePicker-MonthTitle'>{months[currentMonth.getMonth()]}</span>
				<IconButton
					onClick={nextMonth}
					className='DatePicker-Next'>
					<ArrowRight />
				</IconButton>
			</div>
			<Calendar
				activeDate={activeDate}
				date={currentMonth}
				onCellClick={onCellClick}
			/>
		</div>
	);
};
export default DatePicker;
