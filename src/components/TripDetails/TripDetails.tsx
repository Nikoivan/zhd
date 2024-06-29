import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { useAppSelector } from '../../store/store';
import TripDetailsDirection from './Direction/TripDetails-Direction';
import TripDetailsPassengers from './Passengers/TripDetails-Passengers';
import TripDetailsPriceInfo from './PriceInfo/TripDetails';

import './TripDetails.scss';

const cnTripDetails = cn('TripDetails');

const TripDetails: FC = () => {
	const { departure } = useAppSelector((state) => state.ticketData);

	const adults = departure?.seats.filter((item) => item.person_info.is_adult).map((item) => item.price);
	const children = departure?.seats
		.filter((item) => item.is_child && !item.include_children_seat)
		.map((item) => item.price);

	const seatsCounts = {
		adults:
			adults && adults.length ? { count: adults.length, price: adults.reduce((acc, item) => acc + item, 0) } : undefined,
		children:
			children && children.length
				? { count: children.length, price: children.reduce((acc, item) => acc + item, 0) }
				: undefined,
	};

	return (
		<div className={cnTripDetails()}>
			<div className={cnTripDetails('Header')}>
				<h2 className={cnTripDetails('Title')}>Детали поездки</h2>
			</div>
			<div className={cnTripDetails('Main')}>
				{!!departure?.direction && (
					<>
						<TripDetailsDirection
							type='departure'
							direction={departure.direction.departure}
						/>
						{!!departure.direction.arrival && (
							<TripDetailsDirection
								type='arrival'
								direction={departure.direction.arrival}
							/>
						)}
					</>
				)}
			</div>
			<div className={cnTripDetails('Footer')}>
				{!!(seatsCounts.adults || seatsCounts.children) && (
					<>
						<TripDetailsPassengers passList={seatsCounts} />
						<TripDetailsPriceInfo
							amountPrice={
								(seatsCounts.adults ? seatsCounts.adults.price : 0) + (seatsCounts.children ? seatsCounts.children?.price : 0)
							}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default TripDetails;
