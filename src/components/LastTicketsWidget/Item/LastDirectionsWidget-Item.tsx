import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { capitalizeFirstLetter, numberWithSpaces } from '../../../services/utils/strings.util';
import { DirectionListItem } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';
import OptionsIndicator from '../../OptionIndicator/OptionsIndicator';
import Rub from '../../Icons/Rub';

const cnLastDirectionsWidget = cn('LastDirectionsWidget');

const LastDirectionsWidgetItem: FC<DirectionListItem> = ({ departure, min_price }) => (
	<li className={cnLastDirectionsWidget('Item')}>
		<div className={cnLastDirectionsWidget('ItemWrap')}>
			<div className={cnLastDirectionsWidget('FromInfo')}>
				<span className={cnLastDirectionsWidget('City')}>{capitalizeFirstLetter(departure.from.city.name)}</span>
				<span className={cnLastDirectionsWidget('Station')}>
					{capitalizeFirstLetter(departure.from.railway_station_name)}
				</span>
			</div>
			<div className={cnLastDirectionsWidget('ToInfo')}>
				<span className={cnLastDirectionsWidget('City')}>{capitalizeFirstLetter(departure.to.city.name)}</span>
				<span className={cnLastDirectionsWidget('Station')}>
					{capitalizeFirstLetter(departure.to.railway_station_name)}
				</span>
			</div>
		</div>
		<div className={cnLastDirectionsWidget('ItemWrap', { type: 'withPrice' })}>
			<OptionsIndicator
				haveWifi={departure.have_wifi}
				isExpress={departure.is_express}
				haveAirContitioning={departure.have_air_conditioning}
			/>
			<div className={cnLastDirectionsWidget('PriceInfo')}>
				<span className={cnLastDirectionsWidget('Text')}>от</span>
				<span className={cnLastDirectionsWidget('Price')}>{numberWithSpaces(min_price)}</span>
				<Rub fontSize='medium' />
			</div>
		</div>
	</li>
);

export default LastDirectionsWidgetItem;
