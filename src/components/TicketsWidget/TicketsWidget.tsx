import { FC } from 'react';
import { cn } from '@bem-react/classname';

import FormDates from '../Form/Dates/Form-Dates';
import TicketsWidgetOptionsList from './Options-List/TicketsWidget-OptionsList';
import TicketsWidgetPrice from './Price/TicketsWidget-Price';
import TicketsWidgetTimeSet from './TimeSet/TicketsWidget-TimeSetting';

import './TicketsWidget.scss';

type TicketsWidgetProps = {
	dateStart: string | null;
	dateEnd: string | null;
	priceFrom: number | null;
	priceTo: number | null;
	startDepartureHourFrom: number | null; //Час отбытия от
	startDepartureHourTo: number | null; //Час отбытия до
	startArrivalHourFrom: number | null; // Час прибытия от
	startArrivalHourTo: number | null; // Час прибытия до
	endDepartureHourFrom: number | null; //Час отбытия назад от
	endDepartureHourTo: number | null; //Час отбытия назад до
	endArrivalHourFrom: number | null; //Час прибытия назад от (работает при установленном параметре date_end)
	endArrivalHourTo: number | null; //Час прибытия назад до (работает при установленном параметре date_end)
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnTicketWidgets = cn('TicketsWidget');

const TicketsWidget: FC<TicketsWidgetProps> = ({
	dateStart,
	dateEnd,
	priceFrom,
	priceTo,
	startDepartureHourFrom,
	startDepartureHourTo,
	startArrivalHourFrom,
	startArrivalHourTo,
	endDepartureHourFrom,
	endDepartureHourTo,
	endArrivalHourFrom,
	endArrivalHourTo,
	onChange,
}) => (
	<div className={cnTicketWidgets()}>
		<div className={cnTicketWidgets('Item')}>
			<FormDates
				onChange={onChange}
				dateStart={dateStart}
				dateEnd={dateEnd}
				isDefaultTitles
				titleStyles={{ marginTop: '10px' }}
				inputStyles={{ width: '100%', height: '45px' }}
			/>
		</div>
		<div className={cnTicketWidgets('Item', { type: 'options' })}>
			<TicketsWidgetOptionsList onChange={onChange} />
		</div>
		<div className={cnTicketWidgets('Item')}>
			<TicketsWidgetPrice
				onChange={onChange}
				priceFrom={priceFrom}
				priceTo={priceTo}
			/>
		</div>
		<div className={cnTicketWidgets('Item', { type: 'direction' })}>
			<TicketsWidgetTimeSet
				title='Туда'
				type='to'
				departureHourFrom={startDepartureHourFrom}
				departureHourTo={startDepartureHourTo}
				arrivalHourFrom={startArrivalHourFrom}
				arrivalHourTo={startArrivalHourTo}
				onChange={onChange}
			/>
		</div>
		<div className={cnTicketWidgets('Item', { type: 'direction' })}>
			<TicketsWidgetTimeSet
				title='Обратно'
				type='return'
				departureHourFrom={endDepartureHourFrom}
				departureHourTo={endDepartureHourTo}
				arrivalHourFrom={endArrivalHourFrom}
				arrivalHourTo={endArrivalHourTo}
				onChange={onChange}
			/>
		</div>
	</div>
);

export default TicketsWidget;
