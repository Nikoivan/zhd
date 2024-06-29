import { FC, useCallback } from 'react';
import { cn } from '@bem-react/classname';

import './Van.scss';
import VanFirstClass from './FirstClass/Van-FirstClass';
import VanSecondClass from './SecondClass/Van-SecondClass';
import VanThirdClass from './ThirdClass/Van-ThirdClass';
import VanFourthClass from './FourthClass/Van-FourthClass';
import { useAppSelector } from '../../store/store';
import { OnPlaceClickData } from '../TrainInfo/TrainInfo';
import { PriceNames } from '../../redux/slices/ticketSlice/ticketsSliceTypes';

export type Seat = {
	index: number;
	available: boolean;
};

const cnVan = cn('Van');

const Van: FC<{
	type: PriceNames;
	coachId: string;
	seats: Seat[];
	directionId: string;
	onPlaceClick: (data: OnPlaceClickData) => void;
}> = ({ type, coachId, directionId, seats, onPlaceClick }) => {
	const { departure } = useAppSelector((state) => state.ticketData);

	const handlePlaceClick = useCallback(
		(index: number) => {
			onPlaceClick({ index, coach_id: coachId, type });
		},
		[coachId, onPlaceClick, type]
	);

	const selected = [
		...(departure?.route_direction_id === directionId && departure.seats.find((item) => item.coach_id === coachId)
			? departure.seats.filter((item) => item.coach_id === coachId).map((el) => el.seat_number)
			: []),
	];

	return (
		<div className={cnVan({ type })}>
			<span className={cnVan('Number')}>02</span>
			<div className={cnVan('Content')}>
				{type === 'fourth' && (
					<VanFourthClass
						seats={seats}
						selected={selected}
						onPlaceClick={handlePlaceClick}
					/>
				)}
				{type === 'third' && (
					<VanThirdClass
						seats={seats}
						selected={selected}
						onPlaceClick={handlePlaceClick}
					/>
				)}
				{type === 'second' && (
					<VanSecondClass
						seats={seats}
						selected={selected}
						onPlaceClick={handlePlaceClick}
					/>
				)}
				{type === 'first' && (
					<VanFirstClass
						seats={seats}
						selected={selected}
						onPlaceClick={handlePlaceClick}
					/>
				)}
			</div>
		</div>
	);
};

export default Van;
