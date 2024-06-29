import { FC, useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';

import { ArrivalDepartureInfo, PlaceTypes } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';
import Head from '../../Head/Head';
import { getTimeByDuration } from '../../../services/utils/dateFormat.util';
import moment from 'moment';
import ArrowRightFilled from '../../Icons/ArrowRightFilled';
import ArrowLeftFilled from '../../Icons/ArrowLeftFilled';
import { capitalizeFirstLetter } from '../../../services/utils/strings.util';

type TripDetailsDirectionProps = {
	type: PlaceTypes;
	direction: ArrivalDepartureInfo;
};

const cnTripDetails = cn('TripDetails');

const TripDetailsDirection: FC<TripDetailsDirectionProps> = ({ type, direction }) => {
	const [isOpen, setOpen] = useState<boolean>(true);
	const startDate = moment(direction.from.datetime * 1000).format('DD.MM.YYYY');

	const onClick = useCallback(() => {
		setOpen(!isOpen);
	}, [isOpen]);

	return (
		<>
			{!!direction && (
				<div className={cnTripDetails('Direction', { type })}>
					<Head
						type={type}
						isOpen={isOpen}
						title={type === 'departure' ? 'Туда' : 'Обратно'}
						date={startDate}
						onClick={onClick}
					/>
					{isOpen && (
						<>
							<div className={cnTripDetails('DirectionRow', { type: 'first', arrival: type === 'arrival' })}>
								<span className={cnTripDetails('RowTitle')}>№ Поезда</span>
								<span className={cnTripDetails('RowValue', { type: 'number' })}>{direction.train.name}</span>
							</div>
							<div className={cnTripDetails('DirectionRow')}>
								<span className={cnTripDetails('RowTitle')}>Название</span>
								<div className={cnTripDetails('RowValue', { type: 'multyline' })}>
									<span className={cnTripDetails('RowValue')}>{capitalizeFirstLetter(direction.from.city.name)}</span>
									<span className={cnTripDetails('RowValue')}>{capitalizeFirstLetter(direction.to.city.name)}</span>
								</div>
							</div>
							<div className={cnTripDetails('TimeInfo')}>
								<span className={cnTripDetails('DurationTime')}>{getTimeByDuration(direction.duration)}</span>
								<div className={cnTripDetails('TimeRow')}>
									<span className={cnTripDetails('TimePoint')}>{moment(direction.from.datetime * 1000).format('h:mm')}</span>
									{type === 'departure' ? <ArrowRightFilled fontSize='medium' /> : <ArrowLeftFilled fontSize='small' />}
									<span className={cnTripDetails('TimePoint')}>{moment(direction.to.datetime * 1000).format('h:mm')}</span>
								</div>
								<div className={cnTripDetails('TimeRow', { type: 'dates' })}>
									<span className={cnTripDetails('DatePoint')}>{startDate}</span>
									<span className={cnTripDetails('DatePoint')}>{moment(direction.to.datetime * 1000).format('DD.MM.YYYY')}</span>
								</div>
							</div>
							<div className={cnTripDetails('PlacesInfo')}>
								<div className={cnTripDetails('Cities')}>
									<span className={cnTripDetails('City')}>{capitalizeFirstLetter(direction.from.city.name)}</span>
									<span className={cnTripDetails('City')}>{capitalizeFirstLetter(direction.to.city.name)}</span>
								</div>
								<div className={cnTripDetails('Stations')}>
									<span className={cnTripDetails('Station')}>{direction.from.railway_station_name}</span>
									<span className={cnTripDetails('Station')}>{direction.to.railway_station_name}</span>
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default TripDetailsDirection;
