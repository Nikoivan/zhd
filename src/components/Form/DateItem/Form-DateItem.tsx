import { ChangeEvent, FC, useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import { cn } from '@bem-react/classname';

import { FullDate } from '../../../services/calendar/getCalendarCells';
import { Input } from '../../Input/Input';
import DatePicker from '../../DatePicker/DatePicker';

type FormDateItemProps = {
	value: string;
	dateIconUrl: string;
	isOpen: boolean;
	scope: string | null;
	name: string;
	activeDate: string | null;
	inputStyles?: Record<string, string | number>;
	onChange(event: ChangeEvent<HTMLInputElement>): void;
	openCalendar(valueName: string): void;
	onCellClick(e: React.PointerEvent<HTMLButtonElement>, fullDate: FullDate): void;
	onClickOutside(): void;
};

const cnForm = cn('Form');

const FormDateItem: FC<FormDateItemProps> = ({
	onChange,
	value,
	openCalendar,
	dateIconUrl,
	isOpen,
	scope,
	name,
	activeDate,
	inputStyles,
	onCellClick,
	onClickOutside,
}) => {
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);

	return (
		<>
			<Input
				className={cnForm('Input')}
				onChange={onChange}
				placeholder='дд/мм/гг'
				name={name}
				value={value}
				style={inputStyles}
				endAdornment={
					<IconButton
						onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
							if (!e.target) {
								return;
							}

							setAnchorEl(e.target as Element);
							openCalendar(name);
						}}>
						<img src={dateIconUrl} />
					</IconButton>
				}
			/>

			<Popover
				slotProps={{ paper: { style: { overflow: 'visible' } } }}
				open={isOpen && scope === name}
				anchorOrigin={{ vertical: -67, horizontal: -275 }}
				anchorEl={anchorEl}>
				<DatePicker
					activeDate={activeDate}
					onClickOutside={onClickOutside}
					onCellClick={onCellClick}
				/>
			</Popover>
		</>
	);
};

export default FormDateItem;
