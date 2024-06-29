import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';

import TicketsWidgetSlider from '../Slider/TicketsWidgetSlider';
import Head from '../../Head/Head';

type TicketsWidgetTimeSetProps = {
	title: string;
	departureHourFrom: number | null; //Час отбытия от
	departureHourTo: number | null; //Час отбытия до
	arrivalHourFrom: number | null; // Час прибытия от
	arrivalHourTo: number | null; // Час прибытия до
	type: 'to' | 'return';
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnTicketsWidget = cn('TicketsWidget');

// количество секунд в сутках 86400

// const departure_hour_from =

const TicketsWidgetTimeSet: FC<TicketsWidgetTimeSetProps> = ({
	title,
	departureHourFrom,
	departureHourTo,
	arrivalHourFrom,
	arrivalHourTo,
	type,
	onChange,
}) => {
	const [isOpen, setOpen] = useState<boolean>(
		!!(departureHourFrom || departureHourTo || arrivalHourFrom || arrivalHourTo) || false
	);

	const onClick = () => {
		setOpen(!isOpen);
	};

	return (
		<div className={cnTicketsWidget('TimeSet')}>
			<Head
				type={type === 'to' ? 'departure' : 'arrival'}
				isOpen={isOpen}
				title={title}
				onClick={onClick}
			/>

			{isOpen && (
				<>
					<TicketsWidgetSlider
						title='Время отбытия'
						fromName='start_departure_hour_from'
						toName='start_departure_hour_to'
						from={departureHourFrom}
						to={departureHourTo}
						onChange={onChange}
					/>
					<TicketsWidgetSlider
						title='Время прибытия'
						fromName='start_arrival_hour_from'
						toName='start_arrival_hour_to'
						from={arrivalHourFrom}
						to={arrivalHourTo}
						arrival
						onChange={onChange}
					/>
				</>
			)}
		</div>
	);
};

export default TicketsWidgetTimeSet;
