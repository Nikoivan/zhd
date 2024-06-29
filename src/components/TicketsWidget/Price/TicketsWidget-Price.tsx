import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import ItemTitle from '../../ItemTitle/ItemTitle';
import { Box, Slider } from '@mui/material';

type Mark = {
	value: number;
	label: string | null;
};

type TicketWidgetPriceProps = {
	priceFrom: number | null;
	priceTo: number | null;
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnTicketsWidget = cn('TicketsWidget');

const TicketsWidgetPrice: FC<TicketWidgetPriceProps> = ({ priceFrom, priceTo, onChange: onChangeInvoke }) => {
	const [values, setValues] = useState<number[]>([
		priceFrom ? Math.floor((priceFrom - 1920) / 50.8) : 0,
		priceTo ? Math.floor((priceTo - 1920) / 50.8) : 100,
	]);

	const getMarks = (): Mark[] => {
		return [
			{ value: 0, label: null },
			{ value: 100, label: values[1] < 85 ? '7000' : null },
		];
	};

	const onChange = (event: Event, value: number | number[]): void => {
		if (!event.target) {
			return;
		}

		if (Array.isArray(value)) {
			const [from, to] = value;

			if (priceFrom !== from) {
				onChangeInvoke('price_from', Math.ceil((from * 50.8 + 1920) / 10) * 10);
			}

			if (priceTo !== to) {
				onChangeInvoke('price_to', Math.ceil((to * 50.8 + 1920) / 10) * 10);
			}

			setValues(value);
		}
	};

	return (
		<div className={cnTicketsWidget('Price')}>
			<ItemTitle size='xl'>Стоимость</ItemTitle>
			<Box sx={{ width: 295, marginTop: '23px', marginBottom: '17px' }}>
				<Slider
					value={values}
					onChange={onChange}
					valueLabelDisplay='on'
					valueLabelFormat={(value) => {
						return Math.ceil((value * 50.8 + 1920) / 10) * 10;
					}}
					marks={getMarks()}
				/>
			</Box>
		</div>
	);
};

export default TicketsWidgetPrice;
