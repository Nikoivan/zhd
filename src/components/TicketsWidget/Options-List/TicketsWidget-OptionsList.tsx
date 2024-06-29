import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import compUrl from '../../../assets/icons/compartment.svg';
import resSeatUrl from '../../../assets/icons/reserve-seat.svg';
import seatUrl from '../../../assets/icons/seat.svg';
import luxeUrl from '../../../assets/icons/luxury.svg';
import wifiUrl from '../../../assets/icons/wi-fi.svg';
import expressUrl from '../../../assets/icons/express.svg';
import TicketsWidgetListItem, { TicketsWidgetListItemProps } from '../ListItem/TicketsWidget-ListItem';

const options: Omit<TicketsWidgetListItemProps, 'checked' | 'onChange'>[] = [
	{ title: 'Купе', url: compUrl, name: 'have_second_class' },
	{ title: 'Плацкарт', url: resSeatUrl, name: 'have_third_class' },
	{ title: 'Сидячий', url: seatUrl, name: 'have_fourth_class' },
	{ title: 'Люкс', url: luxeUrl, name: 'have_first_class' },
	{ title: 'Wi-Fi', url: wifiUrl, name: 'have_wifi' },
	{ title: 'Экспресс', url: expressUrl, name: 'have_express' },
];

export type TicketsWidgetOptionsState = {
	have_first_class: boolean;
	have_second_class: boolean;
	have_third_class: boolean;
	have_fourth_class: boolean;
	have_wifi: boolean;
	have_air_conditioning: boolean;
	have_express: boolean;
};

export type NameType =
	| 'have_first_class'
	| 'have_second_class'
	| 'have_third_class'
	| 'have_fourth_class'
	| 'have_wifi'
	| 'have_air_conditioning'
	| 'have_express';

type TicketsWidgetOptionsListProps = {
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnTicketWidgets = cn('TicketsWidget');

const TicketsWidgetOptionsList: FC<TicketsWidgetOptionsListProps> = ({ onChange: onChangeInvoke }) => {
	const [searchParams] = useSearchParams();

	const onChange = (optionName: NameType, value: boolean) => {
		onChangeInvoke(optionName, value || '');
	};

	return (
		<ul className={cnTicketWidgets('List')}>
			{options.map((option, idx) => (
				<TicketsWidgetListItem
					key={idx}
					{...option}
					checked={!!searchParams.get(option.name)}
					onChange={onChange}
				/>
			))}
		</ul>
	);
};

export default TicketsWidgetOptionsList;
