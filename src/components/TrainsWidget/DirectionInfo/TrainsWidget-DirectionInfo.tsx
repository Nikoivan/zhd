import { FC } from 'react';
import { cn } from '@bem-react/classname';
import moment from 'moment';
import { capitalizeFirstLetter } from '../../../services/utils/strings.util';
import { getTimeByDuration } from '../../../services/utils/dateFormat.util';
import ArrowRightFilled from '../../Icons/ArrowRightFilled';
import { ArrivalDepartureInfo } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';
import ArrowLeftFilled from '../../Icons/ArrowLeftFilled';

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetDirectionInfo: FC<ArrivalDepartureInfo & { type: 'departure' | 'arrival' }> = ({
	from,
	duration,
	to,
	type,
}) => (
	<div className={cnTrainsWidget('DirectionInfo')}>
		<div className={cnTrainsWidget('DirectionWrap')}>
			<span className={cnTrainsWidget('DirectionTime', ['H3', 'Bold'])}>
				{moment(from.datetime * 1000).format('h:mm')}
			</span>
			<span className={cnTrainsWidget('DirectionCity')}>{capitalizeFirstLetter(from.city.name)}</span>
			<span className={cnTrainsWidget('DirectionRailwayStation')}>{from.railway_station_name}</span>
		</div>
		<div className={cnTrainsWidget('DirectionWrap', { type: 'notStretched' })}>
			<span className={cnTrainsWidget('DurationTime', ['H4'])}>{getTimeByDuration(duration)}</span>
			{type === 'departure' ? <ArrowRightFilled fontSize='medium' /> : <ArrowLeftFilled fontSize='small' />}
		</div>
		<div className={cnTrainsWidget('DirectionWrap')}>
			<span className={cnTrainsWidget('DirectionTime', ['H3', 'Bold'])}>{moment(to.datetime * 1000).format('h:mm')}</span>
			<span className={cnTrainsWidget('DirectionCity')}>{capitalizeFirstLetter(to.city.name)}</span>
			<span className={cnTrainsWidget('DirectionRailwayStation')}>{to.railway_station_name}</span>
		</div>
	</div>
);

export default TrainsWidgetDirectionInfo;
