import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { DirectionListItem } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';
import { ticketDataActions } from '../../../redux/slices/ticketSlice/ticketSlice';
import { capitalizeFirstLetter } from '../../../services/utils/strings.util';
import ArrowRightOutlined from '../../Icons/ArrowRightOutlined';
import { Button } from '../../Button/Button';
import TrainsWidgetPlaceItem from '../PlaceItem/TrainsWidget-PlaceItem';
import TrainsWidgetDirectionInfo from '../DirectionInfo/TrainsWidget-DirectionInfo';
import OptionsIndicator from '../../OptionIndicator/OptionsIndicator';

import trainUrl from '../../../assets/icons/trainIcon.svg';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useLocation, useNavigate } from 'react-router';
import { getParamsByOptions } from '../../../services/utils/url.util';
import { createSearchParams, useSearchParams } from 'react-router-dom';

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetListItem: FC<DirectionListItem & { returnToList?: boolean }> = (props) => {
	const { lastDirectionsRequest } = useAppSelector((state) => state.ticketData);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [searchParams] = useSearchParams();
	const { available_seats_info, departure, arrival, returnToList } = props;
	const { train, from, to, price_info, have_wifi, have_air_conditioning, have_express, _id } = departure;

	const onClick = () => {
		let params;
		if (!returnToList) {
			params = getParamsByOptions({
				have_first_class: !!searchParams.get('have_first_class'),
				have_second_class: !!searchParams.get('have_second_class'),
				have_third_class: !!searchParams.get('have_third_class'),
				have_fourth_class: !!searchParams.get('have_fourth_class'),
				have_wifi: !!searchParams.get('have_wifi'),
				have_air_conditioning: !!searchParams.get('have_air_conditioning'),
				have_express: !!searchParams.get('have_express'),
				price_from: searchParams.has('price_from') ? Number(searchParams.get('price_from')) : null,
				price_to: searchParams.has('price_to') ? Number(searchParams.get('price_to')) : null,
				//добавить параметры времени отправления и возвращения
			});

			dispatch(ticketDataActions.setActiveDirection({ direction: props }));
			dispatch(
				ticketDataActions.setLastDirectionsRequestPath({ path: `..${location.pathname}?${searchParams.toString()}` })
			);
		}
		navigate(
			returnToList && lastDirectionsRequest
				? lastDirectionsRequest
				: { pathname: `../seats/${_id}`, search: '?' + createSearchParams(params) }
		);
	};

	return (
		<li className={cnTrainsWidget('ListItem', { single: returnToList })}>
			<div className={cnTrainsWidget('ItemHead')}>
				<img
					className={cnTrainsWidget('ItemIcon')}
					src={trainUrl}
					alt='train icon'
				/>
				<span className={cnTrainsWidget('TrainNumber', ['H3', 'Bold'])}>{train.name}</span>
				<div className={cnTrainsWidget('DirectionTitles')}>
					<span className={cnTrainsWidget('DepartureCity')}>
						{capitalizeFirstLetter(from.city.name)} <ArrowRightOutlined fontSize='inherit' />
					</span>
					<span className={cnTrainsWidget('ArrivalCity')}>{capitalizeFirstLetter(to.city.name)}</span>
				</div>
			</div>
			<div className={cnTrainsWidget('DirectionsWrap')}>
				<TrainsWidgetDirectionInfo
					{...departure}
					type='departure'
				/>
				{!!arrival && (
					<TrainsWidgetDirectionInfo
						{...arrival}
						type='arrival'
					/>
				)}
			</div>
			<div className={cnTrainsWidget('PlacesInfo')}>
				{!!available_seats_info.fourth && !!price_info.fourth && (
					<TrainsWidgetPlaceItem
						title='Сидячий'
						freePlaces={available_seats_info.fourth}
						bottomPrice={price_info.fourth.bottom_price}
					/>
				)}
				{!!available_seats_info.third && !!price_info.third && (
					<TrainsWidgetPlaceItem
						title='Плацкарт'
						freePlaces={available_seats_info.third}
						bottomPrice={price_info.third.bottom_price}
					/>
				)}
				{!!available_seats_info.second && !!price_info.second && (
					<TrainsWidgetPlaceItem
						title='Купе'
						freePlaces={available_seats_info.second}
						bottomPrice={price_info.second.bottom_price}
					/>
				)}
				{!!available_seats_info.first && !!price_info.first && (
					<TrainsWidgetPlaceItem
						title='Люкс'
						freePlaces={available_seats_info.first}
						bottomPrice={price_info.first.bottom_price}
					/>
				)}
				<div className={cnTrainsWidget('AddWrap')}>
					<OptionsIndicator
						className={cnTrainsWidget('Options')}
						haveWifi={have_wifi}
						isExpress={have_express}
						haveAirContitioning={have_air_conditioning}
					/>
					<Button
						className={cnTrainsWidget('MainButton', { type: returnToList ? 'navigated' : undefined }, ['H3', 'Bold'])}
						onClick={onClick}>
						{returnToList ? 'Изменить' : 'Выбрать места'}
					</Button>
				</div>
			</div>
		</li>
	);
};

export default TrainsWidgetListItem;
