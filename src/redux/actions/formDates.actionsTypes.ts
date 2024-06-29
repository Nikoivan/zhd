import { PayloadAction } from '@reduxjs/toolkit';

import { FullDate } from '../../services/calendar/getCalendarCells';
import { AnchorPositionProps } from '../../types/types';

export type FormSelectOptions = {
	_id: string;
	name: string;
};

type CalendarScope = { scope: string };
type Select = { position: AnchorPositionProps; fullDate: FullDate };
type ChangeDate = { name: string; value: string };

export type CalendarScopeAction = PayloadAction<CalendarScope>;
export type SelectAction = PayloadAction<Select>;
export type ChangeDateAction = PayloadAction<ChangeDate>;
