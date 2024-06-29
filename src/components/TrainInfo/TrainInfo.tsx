import { FC, useCallback, useState } from 'react';
import { cn } from '@bem-react/classname';
import moment from 'moment';

import { ArrivalDepartureInfo, PlaceTypes, PriceNames } from '../../redux/slices/ticketSlice/ticketsSliceTypes';
import { getFullTimeByDuration } from '../../services/utils/dateFormat.util';
import { capitalizeFirstLetter } from '../../services/utils/strings.util';
import Train from '../Icons/Train';
import ArrowRightOutlined from '../Icons/ArrowRightOutlined';
import ArrowRightFilled from '../Icons/ArrowRightFilled';
import ArrowLeftFilled from '../Icons/ArrowLeftFilled';
import Clock from '../Icons/Clock';
import { SeatsWidgetItemProps } from '../SeatsWidget/SeatsWidget';
import TrainInfoVanTypeList from './VanTypeList/TrainInfo-VanTypeList';

import './TrainInfo.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ticketDataActions } from '../../redux/slices/ticketSlice/ticketSlice';
import getPriceByInfo from '../../services/utils/prices.utils';
import uuid from 'react-uuid';

type TypeSeats = 'is_adult' | 'is_child';

type TrainInfoProps = {
	directionInfo: ArrivalDepartureInfo;
	data: SeatsWidgetItemProps[];
	size?: string;
	iconColor?: string;
	type: PlaceTypes;
};

export type OnPlaceClickData = { index: number; coach_id: string; type: PriceNames };

const cnTrainInfo = cn('TrainInfo');

const TrainInfo: FC<TrainInfoProps> = ({
	directionInfo: { train, duration, from, to, available_seats, _id },
	data,
	type,
}) => {
	const [activeType, setActiveType] = useState<TypeSeats>('is_adult');
	const [withChildPlace, setChildPlace] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const { activeDirection, departure } = useAppSelector((state) => state.ticketData);

	const seatsCounts = {
		adults: departure?.seats.filter((item) => item.person_info.is_adult).length || 0,
		children: departure?.seats.filter((item) => item.is_child && !item.include_children_seat).length || 0,
		childrenWithoutPlace: departure?.seats.filter((item) => !item.is_child && item.include_children_seat).length || 0,
	};

	const [hours, minutes] = getFullTimeByDuration(duration);

	const handleSeatType = useCallback((type: TypeSeats) => {
		if (type === 'is_child') {
			setChildPlace(false);
		}
		setActiveType(type);
	}, []);

	const handleWithChild = useCallback(() => {
		if (activeType === 'is_child') return;
		setChildPlace(!withChildPlace);
	}, [activeType, withChildPlace]);

	const onPlaceClick = useCallback(
		({ index, coach_id, type: priceType }: OnPlaceClickData) => {
			const priceItem = activeDirection?.[type]?.price_info[priceType];
			const is_adult = activeType === 'is_adult';
			const is_child = activeType === 'is_child';

			if (!priceItem) {
				throw new Error('Отсутствует информация о ценах');
			}
			const price = getPriceByInfo({ priceItem, isLuxury: priceType === 'first', isChild: is_child, index });

			dispatch(
				ticketDataActions.addPlace({
					price,
					personId: uuid(),
					directionId: _id,
					seatInfo: {
						coach_id, // вытаскивать при клике из вагона,
						include_children_seat: withChildPlace,
						is_child,
						seat_number: index,
					},
					personInfo: {
						first_name: '',
						last_name: '',
						patronymic: '',
						gender: true,
						is_adult,
						birthday: '',
						document_data: '',
						document_type: is_adult ? 'passport' : 'certificate',
					},
				})
			);
		},
		[_id, activeDirection, activeType, dispatch, type, withChildPlace]
	);

	return (
		<div className={cnTrainInfo()}>
			<div className={cnTrainInfo('AboutTrain')}>
				<div className={cnTrainInfo('Wrap')}>
					<Train
						// color={iconColor || '#FFA800'}
						fontSize='large'
					/>
					<div className={cnTrainInfo('Head')}>
						<span className={cnTrainInfo('TrainNumber', ['H3', 'Bold'])}>{train.name}</span>
						<div className={cnTrainInfo('DirectionTitles')}>
							<span className={cnTrainInfo('DepartureCity')}>
								{capitalizeFirstLetter(from.city.name)} <ArrowRightOutlined fontSize='inherit' />
							</span>
							<span className={cnTrainInfo('ArrivalCity')}>{capitalizeFirstLetter(to.city.name)}</span>
						</div>
					</div>
				</div>
				<div className={cnTrainInfo('Wrap', { type: 'main' })}>
					<div className={cnTrainInfo('ItemWrap')}>
						<span className={cnTrainInfo('DirectionTime', ['H3', 'Bold'])}>
							{moment(from.datetime * 1000).format('h:mm')}
						</span>
						<span className={cnTrainInfo('DirectionCity')}>{capitalizeFirstLetter(from.city.name)}</span>
						<span className={cnTrainInfo('DirectionRailwayStation')}>{from.railway_station_name} вокзал</span>
					</div>
					<div className={cnTrainInfo('ItemWrap', { type: 'notStretched' })}>
						{type === 'departure' ? (
							<ArrowRightFilled
								className={cnTrainInfo('Icon')}
								fontSize='inherit'
							/>
						) : (
							<ArrowLeftFilled
								className={cnTrainInfo('Icon')}
								fontSize='inherit'
							/>
						)}
					</div>
					<div className={cnTrainInfo('ItemWrap')}>
						<span className={cnTrainInfo('DirectionTime', ['H3', 'Bold'])}>{moment(to.datetime * 1000).format('h:mm')}</span>
						<span className={cnTrainInfo('DirectionCity')}>{capitalizeFirstLetter(to.city.name)}</span>
						<span className={cnTrainInfo('DirectionRailwayStation')}>{to.railway_station_name} вокзал</span>
					</div>
				</div>
				<div className={cnTrainInfo('Wrap', { type: 'last' })}>
					<div className={cnTrainInfo('Duration')}>
						<Clock fontSize='inherit' />
						<div className={cnTrainInfo('DurationWrap')}>
							{!!hours && <span className={cnTrainInfo('DurationItem', ['H4'])}>{hours}</span>}
							{!!minutes && <span className={cnTrainInfo('DurationItem', ['H4'])}>{minutes}</span>}
						</div>
					</div>
				</div>
			</div>
			<div className={cnTrainInfo('Tickets')}>
				<div className={cnTrainInfo('TicketsHeader')}>
					<h4 className={cnTrainInfo('TicketsTitle', ['H2'])}>Количество билетов</h4>
				</div>
				<div className={cnTrainInfo('TicketsMain')}>
					<ul className={cnTrainInfo('TicketsList', ['List'])}>
						<li
							className={cnTrainInfo('TicketsItem', { selected: activeType === 'is_adult' })}
							onClick={() => {
								handleSeatType('is_adult');
							}}>
							<span className={cnTrainInfo('ItemType')}>Взрослый — {seatsCounts.adults}</span>
							<span className={cnTrainInfo('ItemAnnotation')}>Можно добавить еще {available_seats} пассажиров</span>
						</li>
						<li
							className={cnTrainInfo('TicketsItem', { selected: activeType === 'is_child' })}
							onClick={() => {
								handleSeatType('is_child');
							}}>
							<span className={cnTrainInfo('ItemType')}>Детских — {seatsCounts.children}</span>
							<span className={cnTrainInfo('ItemAnnotation')}>
								Можно добавить еще {seatsCounts.children} детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в
								среднем на 50-65%
							</span>
						</li>
						<li
							className={cnTrainInfo('TicketsItem', { selected: withChildPlace })}
							onClick={handleWithChild}>
							<span className={cnTrainInfo('ItemType')}>Детских «без места» — {seatsCounts.childrenWithoutPlace}</span>
						</li>
					</ul>
					<div className={cnTrainInfo('VanType')}>
						<h4 className={cnTrainInfo('VanTypeTitle', ['H2'])}>Тип вагона</h4>
						<TrainInfoVanTypeList
							data={data}
							directionId={_id}
							onPlaceClick={onPlaceClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainInfo;
