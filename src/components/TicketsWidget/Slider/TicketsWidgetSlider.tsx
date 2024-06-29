import { cn } from '@bem-react/classname';
import { Box, Slider } from '@mui/material';
import { FC, useCallback, useState } from 'react';

type TicketsWidgetSliderProps = {
	title: string;
	from: number | null;
	to: number | null;
	fromName: string;
	toName: string;
	arrival?: boolean;
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnTicketWidgets = cn('TicketsWidget');

const TicketsWidgetSlider: FC<TicketsWidgetSliderProps> = ({
	title,
	from,
	to,
	fromName,
	toName,
	arrival,
	onChange: onChangeInvoke,
}) => {
	const [values, setValues] = useState<number[]>([from ? from / 864 : 0, to ? to / 864 : 100]);

	const getMarks = (): { value: number; label: string | null }[] => {
		return [
			{ value: 0, label: null },
			{ value: 100, label: values[1] < 80 ? '24:00' : null },
		];
	};

	const onChange = useCallback((event: Event, value: number | number[]) => {
		if (!event.target || !value) {
			return;
		}

		if (Array.isArray(value)) {
			const [from, to] = value;

			if (from !== values[0]) {
				console.log(from);
				onChangeInvoke(fromName, from * 864);
			}

			if (to !== values[1]) {
				onChangeInvoke(toName, to * 864);
			}

			setValues(value);
		}
	}, []);

	return (
		<Box
			className={cnTicketWidgets('TimeSetContainer', { arrival })}
			sx={{ width: 295, marginTop: '14px', marginBottom: '17px' }}>
			<span className={cnTicketWidgets('SliderTitle')}>{title}</span>
			<Slider
				value={values}
				name='TEST'
				onChange={onChange}
				valueLabelDisplay='on'
				valueLabelFormat={(value) => {
					return `${Math.ceil(value / 4.167)}:00`;
				}}
				marks={getMarks()}
			/>
		</Box>
	);
};

export default TicketsWidgetSlider;
