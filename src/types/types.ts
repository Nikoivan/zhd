import { FullDate } from '../services/calendar/getCalendarCells';

export type CalendarOpenScope = {
	isOpen: boolean;
	scope: 'date_start' | 'date_end' | null;
};

export type DateValues = {
	date_start: { value: string; date: FullDate | null };
	date_end: { value: string; date: FullDate | null };
};

export type AnchorPositionProps = {
	top: number;
	left: number;
};

export type Data = unknown;
