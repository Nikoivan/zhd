import { FC, useState } from 'react';
import { cn } from '@bem-react/classname';
import { IconButton } from '@mui/material';

import { numberWithSpaces } from '../../../services/utils/strings.util';
import PassengerIcon from '../../Icons/PassengerIcon';
import Rub from '../../Icons/Rub';

import iconPlusUrl from '../../../assets/icons/plus-in-square.svg';
import iconMinusUrl from '../../../assets/icons/minus-in-square.svg';

type TripDetailsPassengersProps = {
	passList: {
		adults?: { count: number; price: number };
		children?: { count: number; price: number };
	};
};

const cnTripDetails = cn('TripDetails');

const TripDetailsPassengers: FC<TripDetailsPassengersProps> = ({ passList }) => {
	const [isOpen, setOpen] = useState<boolean>(true);

	const onClick = () => {
		setOpen(!isOpen);
	};

	const { adults, children } = passList;

	return (
		<div className={cnTripDetails('Passengers')}>
			<div className={cnTripDetails('PassengersHead')}>
				<PassengerIcon className={cnTripDetails('PassengersIcon')} />
				<span className={cnTripDetails('PassengersTitle', ['Bold'])}>Пассажиры</span>
				<IconButton onClick={onClick}>
					<img
						src={isOpen ? iconMinusUrl : iconPlusUrl}
						alt='свернуть/развернуть'
					/>
				</IconButton>
			</div>
			<div className={cnTripDetails('PassengersMain')}>
				<ul className={cnTripDetails('PassengersList', ['List'])}>
					{!!adults && (
						<li className={cnTripDetails('PassengersListItem')}>
							<span className={cnTripDetails('PassengersCount')}>{adults.count} Взрослых</span>
							<span className={cnTripDetails('PassengersPrice', ['Bold'])}>
								{numberWithSpaces(adults.price)} <Rub fontSize='small' />
							</span>
						</li>
					)}
					{!!children && (
						<li className={cnTripDetails('PassengersListItem')}>
							<span className={cnTripDetails('PassengersCount')}>{children.count} Ребенок</span>
							<span className={cnTripDetails('PassengersPrice', ['Bold'])}>
								{numberWithSpaces(Math.ceil(children.price))} <Rub fontSize='small' />
							</span>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default TripDetailsPassengers;
